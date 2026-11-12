import api from "./axiosInstance";
import API from "./endpoints";

const normalizeLookupList = (payload) => {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
    ? payload.data
    : [];

  return list
    .filter((item) => item && item.isDeleted !== true)
    .map((item) => ({
      id: Number(item.id),
      name: String(item.name || "").trim(),
    }))
    .filter((item) => item.id && item.name);
};

export const getLoanTypes = async () => {
  const response = await api.get(API.LOAN_TYPES);
  return normalizeLookupList(response.data);
};

export const getRecoveryTypes = async () => {
  const response = await api.get(API.RECOVERY_TYPES);
  return normalizeLookupList(response.data);
};

export const getInsuranceTypes = async () => {
  const response = await api.get(API.INSURANCE_TYPES);
  return normalizeLookupList(response.data);
};

const yesNo = (value) => {
  if (value === true || value === false) return value;
  const text = String(value || "").toLowerCase();
  return text === "yes" || text === "true" || text === "1";
};

const toId = (value) => {
  if (value === null || value === undefined || value === "") return null;
  if (typeof value === "object") {
    const nested = Number(value.id);
    return Number.isFinite(nested) && nested > 0 ? nested : null;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const toUiLoanPlan = (item) => ({
  ...item,
  id: item.id,
  loanTypeId: item.loanTypeId ?? item.loanType?.id ?? null,
  recoveryTypeId: item.recoveryTypeId ?? item.recoveryType?.id ?? null,
  insuranceTypeId: item.insuranceTypeId ?? item.insuranceType?.id ?? null,
  loanType:
    item.loanType?.name ||
    (typeof item.loanType === "string" ? item.loanType : ""),
  recoveryType:
    item.recoveryType?.name ||
    (typeof item.recoveryType === "string" ? item.recoveryType : ""),
  numberOfEmi: item.numberOfEMI ?? item.numberOfEmi ?? 0,
  insuranceFeeType:
    item.insuranceType?.name ||
    item.insuranceFeeType ||
    "",
  insuranceFeeAmount: item.insuranceAmount ?? item.insuranceFeeAmount ?? 0,
  processingFeeChargeInclude:
    item.processingFeeInclude ?? item.processingFeeChargeInclude ?? false,
  insuranceFeeChargeInclude:
    item.insuranceChargeInclude ?? item.insuranceFeeChargeInclude ?? false,
  status:
    item.status === true || String(item.status).toLowerCase() === "active"
      ? "Active"
      : "Inactive",
});

const toApiLoanPlan = (data, id = 0) => {
  const planId = Number(id || data.id || 0);

  return {
    id: planId,
    loanTypeId: toId(data.loanTypeId ?? data.loanType),
    planName: String(data.planName || "").trim(),
    numberOfEMI: Number(data.numberOfEMI ?? data.numberOfEmi ?? 0),
    recoveryTypeId: toId(data.recoveryTypeId ?? data.recoveryType),
    planAmount: Number(data.planAmount || 0),
    paidAmount: Number(data.paidAmount || 0),
    holidayExclude: yesNo(data.holidayExclude),
    gstChargeInclude: yesNo(data.gstChargeInclude),
    fileChargeInclude: yesNo(data.fileChargeInclude),
    fileCharge: Number(data.fileCharge || 0),
    processingFeeInclude: yesNo(
      data.processingFeeInclude ?? data.processingFeeChargeInclude
    ),
    processingFeePercentage: Number(data.processingFeePercentage || 0),
    processingFeeAmount: Number(data.processingFeeAmount || 0),
    insuranceChargeInclude: yesNo(
      data.insuranceChargeInclude ?? data.insuranceFeeChargeInclude
    ),
    insuranceTypeId: toId(data.insuranceTypeId ?? data.insuranceFeeType),
    insuranceAmount: Number(data.insuranceAmount ?? data.insuranceFeeAmount ?? 0),
    status:
      typeof data.status === "boolean"
        ? data.status
        : String(data.status || "Active").toLowerCase() === "active",
    createdAt: data.createdAt || new Date().toISOString(),
    updatedAt: planId ? new Date().toISOString() : null,
    createdBy: data.createdBy ?? 0,
    updatedBy: planId ? 0 : null,
  };
};

export const getLoanPlans = async () => {
  const response = await api.get("/LoanPlans");
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(toUiLoanPlan);
};



// GET LOAN PLAN BY ID


export const getLoanPlanById = async (id) => {
  try {
    const response = await api.get(`/LoanPlans/${id}`);

    console.log(
      "GET LOAN PLAN BY ID:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "GET LOAN PLAN BY ID ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// CREATE LOAN PLAN


export const createLoanPlan = async (data) => {
  try {
    console.log(
      "CREATE LOAN PLAN REQUEST:",
      data
    );

    const response = await api.post(
      "/LoanPlans",
      toApiLoanPlan(data, 0)
    );

    console.log(
      "CREATE LOAN PLAN RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "CREATE LOAN PLAN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// UPDATE LOAN PLAN


export const updateLoanPlan = async (id, data) => {
  try {
    const payload = toApiLoanPlan(data, id);

    console.log(
      "UPDATE LOAN PLAN ID:",
      id
    );

    console.log(
      "UPDATE LOAN PLAN REQUEST:",
      payload
    );

    const response = await api.put(
      `/LoanPlans/${id}`,
      payload
    );

    console.log(
      "UPDATE LOAN PLAN RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "UPDATE LOAN PLAN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};



// DELETE LOAN PLAN


export const deleteLoanPlan = async (id) => {
  try {
    console.log(
      "DELETE LOAN PLAN ID:",
      id
    );

    const response = await api.delete(
      `/LoanPlans/${id}`
    );

    console.log(
      "DELETE LOAN PLAN RESPONSE:",
      response.data
    );

    return response.data;
  } catch (error) {
    console.error(
      "DELETE LOAN PLAN ERROR:",
      error.response?.data || error.message
    );

    throw error;
  }
};