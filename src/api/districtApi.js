import api from "./axiosInstance";
import API from "./endpoints";

export const getDistricts = async () => {
  const response = await api.get(API.DISTRICTS);
  return Array.isArray(response.data) ? response.data : [];
};

export const getDistrictById = async (id) => {
  const response = await api.get(API.DISTRICT_BY_ID(id));
  return response.data;
};

export const createDistrict = async (districtData) => {
  const response = await api.post(API.DISTRICTS, districtData);
  return response.data;
};

export const updateDistrict = async (id, districtData) => {
  const response = await api.put(API.DISTRICT_BY_ID(id), districtData);
  return response.data;
};

export const deleteDistrict = async (id) => {
  const response = await api.delete(API.DISTRICT_BY_ID(id));
  return response.data;
};
