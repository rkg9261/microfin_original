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

const toUiIdentity = (item) => ({
  ...item,
  id: item.id,
  identity: item.identityName ?? item.identity ?? "",
  identityName: item.identityName ?? item.identity ?? "",
  status: toStatusLabel(item.status),
});

const toApiIdentity = (data) => {
  const payload = {
    identityName: data.identityName ?? data.identity ?? "",
    status: toStatusBool(data.status),
    createdDate: data.createdDate ?? new Date().toISOString(),
  };

  const id = Number(data.id ?? 0);
  if (id > 0) {
    payload.id = id;
  }

  return payload;
};

export const getIdentityProofs = async () => {
  const response = await api.get(API.IDENTITIES);
  return mapList(response.data, toUiIdentity);
};

export const getIdentityProofById = async (id) => {
  const response = await api.get(API.IDENTITY_BY_ID(id));
  return toUiIdentity(response.data);
};

export const createIdentityProof = async (data) => {
  const response = await api.post(API.IDENTITIES, toApiIdentity(data));
  return toUiIdentity(response.data);
};

export const updateIdentityProof = async (id, data) => {
  const response = await api.put(
    API.IDENTITY_BY_ID(id),
    toApiIdentity({ ...data, id })
  );
  return toUiIdentity(response.data);
};

export const deleteIdentityProof = async (id) => {
  const response = await api.delete(API.IDENTITY_BY_ID(id));
  return response.data;
};
