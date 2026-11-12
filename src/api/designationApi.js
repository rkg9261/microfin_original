import api from "./axiosInstance";
import API from "./endpoints";

const normalizeList = (payload) =>
  Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
    ? payload.data
    : [];

export const getDesignations = async () => {
  const response = await api.get(API.DESIGNATIONS);
  return normalizeList(response.data).filter(
    (item) => item && item.isDeleted !== true
  );
};

export const getDesignationById = async (id) => {
  const response = await api.get(API.DESIGNATION_BY_ID(id));
  return response.data;
};

export const createDesignation = async (data) => {
  const response = await api.post(API.DESIGNATIONS, data);
  return response.data;
};

export const updateDesignation = async (id, data) => {
  const response = await api.put(API.DESIGNATION_BY_ID(id), data);
  return response.data;
};

export const deleteDesignation = async (id) => {
  const response = await api.delete(API.DESIGNATION_BY_ID(id));
  return response.data;
};
