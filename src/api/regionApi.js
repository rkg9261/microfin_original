import api from "./axiosInstance";
import API from "./endpoints";

export const getRegions = async () => {
  const response = await api.get(API.REGION_MASTERS);
  return response.data;
};

export const getRegionById = async (id) => {
  const response = await api.get(API.REGION_MASTER_BY_ID(id));
  return response.data;
};

export const createRegion = async (data) => {
  const response = await api.post(API.REGION_MASTERS, data);
  return response.data;
};

export const updateRegion = async (id, data) => {
  const response = await api.put(API.REGION_MASTER_BY_ID(id), data);
  return response.data;
};

export const deleteRegion = async (id) => {
  const response = await api.delete(API.REGION_MASTER_BY_ID(id));
  return response.data;
};
