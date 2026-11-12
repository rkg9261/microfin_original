import api from "./axiosInstance";
import API from "./endpoints";
import { mapList } from "./createResourceApi";

const toUiSession = (item) => ({
  ...item,
  id: item.id,
  session: item.sessionName ?? item.session,
  startDate: item.startDate,
  endDate: item.endDate,
  startYear: item.startYear,
  endYear: item.endYear,
  remark: item.remark,
  status: item.status,
});

const toApiSession = (data) => ({
  id: Number(data.id ?? 0),
  sessionName: data.sessionName ?? data.session ?? "",
  startYear: Number(data.startYear ?? 0),
  startDate: data.startDate,
  endYear: Number(data.endYear ?? 0),
  endDate: data.endDate,
  status: data.status || "ACTIVE",
  remark: data.remark || "-",
  createdDate: data.createdDate ?? new Date().toISOString(),
});

export const getSessions = async () => {
  const response = await api.get(API.SESSIONS);
  return mapList(response.data, toUiSession);
};

export const getSessionById = async (id) => {
  const response = await api.get(API.SESSION_BY_ID(id));
  return toUiSession(response.data);
};

export const createSession = async (data) => {
  const response = await api.post(API.SESSIONS, toApiSession(data));
  return response.data;
};

export const updateSession = async (id, data) => {
  const response = await api.put(
    API.SESSION_BY_ID(id),
    toApiSession({ ...data, id })
  );
  return response.data;
};

export const deleteSession = async (id) => {
  const response = await api.delete(API.SESSION_BY_ID(id));
  return response.data;
};
