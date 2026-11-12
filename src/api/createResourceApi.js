import api from "./axiosInstance";

const unwrap = (response) =>
  response?.data === undefined || response?.data === ""
    ? null
    : response.data;

export const createResourceApi = (path) => ({
  getAll: async () => {
    const response = await api.get(path);
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`${path}/${id}`);
    return unwrap(response);
  },
  create: async (data) => {
    const response = await api.post(path, data);
    return unwrap(response);
  },
  update: async (id, data) => {
    const response = await api.put(`${path}/${id}`, data);
    return unwrap(response);
  },
  remove: async (id) => {
    const response = await api.delete(`${path}/${id}`);
    return unwrap(response);
  },
});

export const mapList = (payload, mapper) => {
  const list = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
    ? payload.data
    : [];

  return mapper ? list.map(mapper) : list;
};
