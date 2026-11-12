import axiosInstance from "./axiosInstance";
import API from "./endpoints";

const normalizeList = (payload) =>
  Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
    ? payload.data
    : [];

const toStatusLabel = (value, fallback = "ACTIVE") => {
  if (value === true) return "ACTIVE";
  if (value === false) return "INACTIVE";
  const raw = String(value || "").toUpperCase();
  if (raw === "ACTIVE" || raw === "PENDING" || raw === "INACTIVE") return raw;
  return fallback;
};

export const mapEmployeeToUi = (item) => {
  if (!item) return null;

  const id = item.employeeId ?? item.id;
  const firstName = item.firstName || "";
  const middleName = item.middleName || "";
  const lastName = item.lastName || "";
  const fullName = [firstName, middleName, lastName].filter(Boolean).join(" ").trim();

  return {
    ...item,
    id,
    employeeId: id,
    companyId: item.companyId ?? item.company?.companyId ?? null,
    branchId: item.branchId ?? item.branch?.branchId ?? null,
    branchName:
      item.branchName ||
      item.branch?.branchName ||
      "",
    designationId: item.designationId ?? item.designation?.designationId ?? null,
    designationName:
      item.designationName ||
      item.designation?.designationName ||
      "",
    employeeCode: item.employeeCode || "",
    firstName,
    middleName,
    lastName,
    name: fullName || item.employeeCode || `Employee ${id}`,
    fatherName: item.fatherName || "",
    gender: item.gender || "",
    dateOfBirth: item.dateOfBirth || "",
    mobileNumber: item.mobileNumber || item.mobile || "",
    alternateMobileNumber: item.alternateMobileNumber || "",
    email: item.email || "",
    address: item.address || "",
    city: item.city || "",
    pincode: item.pincode || "",
    aadhaarNumber: item.aadhaarNumber || "",
    panNumber: item.panNumber || "",
    joiningDate: item.joiningDate || item.doj || "",
    doj: item.doj || item.joiningDate || "",
    employmentType: item.employmentType || "",
    employmentStatus: toStatusLabel(item.employmentStatus, "ACTIVE"),
    isActive: item.isActive !== false,
    loginStatus: item.isActive === false ? "INACTIVE" : "ACTIVE",
    kycStatus: toStatusLabel(item.employmentStatus, "PENDING"),
    salary: item.salary ?? 0,
  };
};

const toDateTime = (value) => {
  if (!value) return null;
  const raw = String(value);
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return `${raw}T00:00:00`;
  return raw;
};

export const mapEmployeeToApi = (form, editing = null) => {
  const employeeId = Number(
    editing?.employeeId ?? editing?.id ?? form.employeeId ?? form.id ?? 0
  );
  const joiningDate =
    toDateTime(form.joiningDate || form.doj) || new Date().toISOString();

  const payload = {
    companyId: Number(form.companyId || 1),
    branchId: Number(form.branchId),
    employeeCode: String(form.employeeCode || "").trim(),
    firstName: String(form.firstName || form.name || "").trim(),
    middleName: form.middleName?.trim?.() || form.middleName || null,
    lastName: form.lastName?.trim?.() || form.lastName || null,
    fatherName: form.fatherName?.trim?.() || form.fatherName || null,
    gender: form.gender || null,
    dateOfBirth: toDateTime(form.dateOfBirth),
    mobileNumber: form.mobileNumber?.trim?.() || form.mobileNumber || null,
    alternateMobileNumber:
      form.alternateMobileNumber?.trim?.() || form.alternateMobileNumber || null,
    email: form.email?.trim?.() || form.email || null,
    address: form.address?.trim?.() || form.address || null,
    city: form.city?.trim?.() || form.city || null,
    pincode: form.pincode?.trim?.() || form.pincode || null,
    aadhaarNumber: form.aadhaarNumber?.trim?.() || form.aadhaarNumber || null,
    panNumber: form.panNumber?.trim?.() || form.panNumber || null,
    designationId: Number(form.designationId),
    reportingManagerId: form.reportingManagerId
      ? Number(form.reportingManagerId)
      : null,
    joiningDate,
    leavingDate: toDateTime(form.leavingDate),
    salary: Number(form.salary || 0),
    doj: toDateTime(form.doj || form.joiningDate) || joiningDate,
    employmentType: form.employmentType || form.staffRole || "Permanent",
    employmentStatus:
      form.kycStatus ||
      form.employmentStatus ||
      (form.loginStatus === "INACTIVE" ? "Inactive" : "Active"),
    isActive:
      form.isActive === true ||
      form.loginStatus === "ACTIVE" ||
      String(form.status || "").toUpperCase() === "ACTIVE",
  };

  if (employeeId > 0) {
    payload.employeeId = employeeId;
  }

  return payload;
};

export const getEmployeeById = async (id) => {
  const response = await axiosInstance.get(API.EMPLOYEE_BY_ID(id));
  return response.data;
};

const fetchEmployeesByIdProbe = async () => {
  const items = [];
  let misses = 0;

  for (let id = 1; id <= 300 && misses < 8; id += 1) {
    try {
      const item = await getEmployeeById(id);
      if (item && item.isDeleted !== true) {
        items.push(mapEmployeeToUi(item));
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

export const getEmployees = async () => {
  const response = await axiosInstance.get(API.EMPLOYEES);
  const list = normalizeList(response.data)
    .filter((item) => item && item.isDeleted !== true)
    .map(mapEmployeeToUi);

  if (list.length > 0) {
    return list;
  }

  return fetchEmployeesByIdProbe();
};

export const createEmployee = async (data) => {
  const response = await axiosInstance.post(API.EMPLOYEES, data);
  return mapEmployeeToUi(response.data);
};

export const updateEmployee = async (id, data) => {
  const response = await axiosInstance.put(API.EMPLOYEE_BY_ID(id), data);
  return mapEmployeeToUi(response.data);
};

export const deleteEmployee = async (id) => {
  const response = await axiosInstance.delete(API.EMPLOYEE_BY_ID(id));
  return response.data;
};
