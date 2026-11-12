import api from "./axiosInstance";


// GET ALL PENALTY SCHEMES


const penaltyTypeToApi = {
  FIXED: 1,
  PERCENTAGE: 2,
};

const penaltyModeToApi = {
  "ONE TIME": 1,
  DAILY: 2,
};

const statusToApi = {
  ACTIVE: 1,
  INACTIVE: 2,
};

const penaltyTypeToUi = {
  1: "FIXED",
  2: "PERCENTAGE",
};

const penaltyModeToUi = {
  1: "ONE TIME",
  2: "DAILY",
};

const statusToUi = {
  1: "ACTIVE",
  2: "INACTIVE",
};

const toUiPenaltyScheme = (item) => ({
  ...item,
  id: item.penaltySchemeId ?? item.id,
  schemeName: item.penaltySchemeName ?? item.schemeName ?? "",
  penaltyType: penaltyTypeToUi[item.penaltyType] ?? item.penaltyType ?? "",
  penaltyMode: penaltyModeToUi[item.penaltyMode] ?? item.penaltyMode ?? "",
  amount: item.amountPercentage ?? item.amount ?? 0,
  minimumAmount: item.minimumDueAmount ?? item.minimumAmount ?? 0,
  gracePeriod: item.gracePeriodDays ?? item.gracePeriod ?? 0,
  recurring:
    item.isRecurring === true
      ? "YES"
      : item.isRecurring === false
        ? "NO"
        : item.recurring ?? "",
  status: statusToUi[item.status] ?? item.status ?? "",
});

const toApiPenaltyScheme = (formData, penaltySchemeId = 0) => ({
  penaltySchemeId: Number(penaltySchemeId || formData.penaltySchemeId || 0),
  penaltySchemeName: String(
    formData.penaltySchemeName ?? formData.schemeName ?? ""
  ).trim(),
  gracePeriodDays: Number(formData.gracePeriodDays ?? formData.gracePeriod ?? 0),
  penaltyType:
    penaltyTypeToApi[String(formData.penaltyType || "").toUpperCase()] ??
    (Number(formData.penaltyType) || 1),
  penaltyMode:
    penaltyModeToApi[String(formData.penaltyMode || "").toUpperCase()] ??
    (Number(formData.penaltyMode) || 1),
  amountPercentage: Number(formData.amountPercentage ?? formData.amount ?? 0),
  minimumDueAmount: Number(
    formData.minimumDueAmount ?? formData.minimumAmount ?? 0
  ),
  isRecurring:
    formData.isRecurring === true ||
    String(formData.recurring || "").toUpperCase() === "YES",
  status:
    statusToApi[String(formData.status || "").toUpperCase()] ??
    (Number(formData.status) || 1),
  createdDate: formData.createdDate || new Date().toISOString(),
  modifiedDate: penaltySchemeId ? new Date().toISOString() : null,
});

export const getPenaltySchemes = async () => {
  const response = await api.get("/PenaltySchemes");
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(toUiPenaltyScheme);
};



// GET PENALTY SCHEME BY ID


export const getPenaltySchemeById = async (
  penaltySchemeId
) => {

  const response = await api.get(
    `/PenaltySchemes/${penaltySchemeId}`
  );

  return response.data;
};



// CREATE PENALTY SCHEME - POST


export const createPenaltyScheme = async (
  formData
) => {

  const requestBody = toApiPenaltyScheme(formData, 0);

  console.log(
    "POST PENALTY SCHEME:",
    requestBody
  );

  const response = await api.post(
    "/PenaltySchemes",
    requestBody
  );

  console.log(
    "POST RESPONSE:",
    response.data
  );

  return response.data;
};



// UPDATE PENALTY SCHEME - PUT


export const updatePenaltyScheme = async (
  penaltySchemeId,
  formData
) => {

  const requestBody = toApiPenaltyScheme(formData, penaltySchemeId);

  console.log(
    "PUT PENALTY SCHEME:",
    requestBody
  );

  const response = await api.put(
    `/PenaltySchemes/${penaltySchemeId}`,
    requestBody
  );

  console.log(
    "PUT RESPONSE:",
    response.data
  );

  return response.data;
};



// DELETE PENALTY SCHEME


export const deletePenaltyScheme = async (
  penaltySchemeId
) => {

  console.log(
    "DELETE PENALTY SCHEME ID:",
    penaltySchemeId
  );

  const response = await api.delete(
    `/PenaltySchemes/${penaltySchemeId}`
  );

  console.log(
    "DELETE RESPONSE:",
    response.data
  );

  return response.data;
};