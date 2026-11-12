import axiosInstance from "./axiosInstance";
import API from "./endpoints";

const normalizeList = (payload) =>
  Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
    ? payload.data
    : [];

export const getCountries = async () => {
  const response = await axiosInstance.get(API.COUNTRIES);
  return normalizeList(response.data)
    .filter((item) => item && item.isDeleted !== true && item.isActive !== false)
    .map((item) => ({
      id: Number(item.countryId ?? item.id),
      name: String(item.countryName || item.name || "").trim(),
      code: String(item.countryCode || item.code || "").trim(),
    }))
    .filter((item) => item.id && item.name);
};

export const getCompanies = async () => {
  const response = await axiosInstance.get(API.COMPANIES);
  return normalizeList(response.data)
    .filter((item) => item && item.isDeleted !== true && item.isActive !== false)
    .map((item) => ({
      id: Number(item.companyId ?? item.id),
      name: String(item.companyName || item.name || "").trim(),
      code: String(item.companyCode || item.code || "").trim(),
    }))
    .filter((item) => item.id && item.name);
};

export const getBranchById = async (branchId) => {
  const response = await axiosInstance.get(API.BRANCH_BY_ID(branchId));
  return response.data;
};

const enrichBranch = async (branch) => {
  const id = branch.branchId ?? branch.id;
  if (!id || branch.contactNumber) {
    return branch;
  }

  try {
    const detail = await getBranchById(id);
    return {
      ...branch,
      contactNumber: detail?.contactNumber ?? branch.contactNumber ?? "",
      contactEmail: detail?.contactEmail ?? branch.contactEmail ?? "",
      landlineNumber: detail?.landlineNumber ?? branch.landlineNumber ?? null,
      stateId: detail?.stateId ?? branch.stateId,
      countryId: detail?.countryId ?? branch.countryId,
      companyId: detail?.companyId ?? branch.companyId,
      districtId: detail?.districtId ?? branch.districtId,
    };
  } catch {
    return branch;
  }
};

// List endpoint currently returns HTTP 500 on the live API.
// Fall back to probing GET /Branches/{id} so Branch screens still load.
const fetchBranchesByIdProbe = async () => {
  const items = [];
  let misses = 0;

  for (let id = 1; id <= 300 && misses < 8; id += 1) {
    try {
      const item = await getBranchById(id);
      if (item && item.isDeleted !== true) {
        items.push(await enrichBranch(item));
        misses = 0;
      } else {
        misses += 1;
      }
    } catch {
      misses += 1;
    }
  }

  return items;
};

export const getBranches = async () => {
  try {
    const response = await axiosInstance.get(API.BRANCHES);
    const list = normalizeList(response.data).filter(
      (item) => item && item.isDeleted !== true
    );

    if (list.length > 0) {
      return Promise.all(list.map((branch) => enrichBranch(branch)));
    }
  } catch {
    // Fall through to by-id probe.
  }

  return fetchBranchesByIdProbe();
};

export const createBranch = async (branchData) => {
  const response = await axiosInstance.post(API.BRANCHES, branchData);
  return response.data;
};

export const updateBranch = async (branchId, branchData) => {
  const response = await axiosInstance.put(
    API.BRANCH_BY_ID(branchId),
    branchData
  );
  return response.data;
};

export const deleteBranch = async (branchId) => {
  const response = await axiosInstance.delete(API.BRANCH_BY_ID(branchId));
  return response.data;
};
