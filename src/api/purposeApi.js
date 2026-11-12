import api from "./axiosInstance";
import API from "./endpoints";

export const getPurposes = async () => {
  const response = await api.get(API.PURPOSE_MASTERS);
  return response.data;
};

export const getPurposeById = async (id) => {
  const response = await api.get(API.PURPOSE_MASTER_BY_ID(id));
  return response.data;
};

export const createPurpose = async (data) => {
  const response = await api.post(API.PURPOSE_MASTERS, data);
  return response.data;
};

export const updatePurpose = async (id, data) => {
  const response = await api.put(API.PURPOSE_MASTER_BY_ID(id), data);
  return response.data;
};

export const deletePurpose = async (id) => {
  const response = await api.delete(API.PURPOSE_MASTER_BY_ID(id));
  return response.data;
};
