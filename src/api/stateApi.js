import api from "./axiosInstance";


// =========================================================
// GET ALL STATES
// =========================================================

export const getStates = async () => {

  const response = await api.get("/States");

  console.log(
    "GET STATES RESPONSE:",
    response.data
  );

  return response.data;
};


// =========================================================
// GET STATE BY ID
// =========================================================

export const getStateById = async (id) => {

  const response =
    await api.get(`/States/${id}`);

  return response.data;
};


// =========================================================
// CREATE STATE
// =========================================================

export const createState = async (stateData) => {

  const response =
    await api.post(
      "/States",
      stateData
    );

  return response.data;
};


// =========================================================
// UPDATE STATE
// =========================================================

export const updateState = async (
  id,
  stateData
) => {

  const response =
    await api.put(
      `/States/${id}`,
      stateData
    );

  return response.data;
};


// =========================================================
// DELETE STATE
// =========================================================

export const deleteState = async (id) => {

  const response =
    await api.delete(
      `/States/${id}`
    );

  return response.data;
};