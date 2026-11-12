import api from "./axiosInstance";
import API from "./endpoints";
import { mapList } from "./createResourceApi";

const toStatusLabel = (status) => {
  if (status === true || String(status).toUpperCase() === "ACTIVE") {
    return "ACTIVE";
  }
  if (status === false || String(status).toUpperCase() === "INACTIVE") {
    return "INACTIVE";
  }
  return "ACTIVE";
};

const toStatusBool = (status) =>
  status === true || String(status).toUpperCase() === "ACTIVE";

const toUiLeave = (item) => ({
  ...item,
  id: item.id,
  name: item.leaveName ?? item.name ?? "",
  leaveName: item.leaveName ?? item.name ?? "",
  status: toStatusLabel(item.status),
});

const toApiLeave = (data) => {
  const payload = {
    leaveName: String(data.leaveName ?? data.name ?? "").trim(),
    status: toStatusBool(data.status),
    createdDate: data.createdDate ?? new Date().toISOString(),
  };

  const id = Number(data.id ?? 0);
  if (id > 0) {
    payload.id = id;
  }

  return payload;
};

export const getLeaveMasters = async () => {
  const response = await api.get(API.LEAVES);
  return mapList(response.data, toUiLeave);
};

export const getLeaveMasterById = async (id) => {
  const response = await api.get(API.LEAVE_BY_ID(id));
  return toUiLeave(response.data);
};

export const createLeaveMaster = async (data) => {
  const response = await api.post(API.LEAVES, toApiLeave(data));
  return toUiLeave(response.data);
};

export const updateLeaveMaster = async (id, data) => {
  const response = await api.put(
    API.LEAVE_BY_ID(id),
    toApiLeave({ ...data, id })
  );
  return toUiLeave(response.data);
};

export const deleteLeaveMaster = async (id) => {
  const response = await api.delete(API.LEAVE_BY_ID(id));
  return response.data;
};
