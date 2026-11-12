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

const toUiRelation = (item) => ({
  ...item,
  id: item.id,
  relation: item.relationName ?? item.relation ?? "",
  relationName: item.relationName ?? item.relation ?? "",
  remark: item.remark ?? "",
  status: toStatusLabel(item.status),
});

const toApiRelation = (data) => {
  const payload = {
    relationName: data.relationName ?? data.relation ?? "",
    remark: data.remark?.trim?.() ? data.remark.trim() : data.remark || null,
    status: toStatusBool(data.status),
    createdDate: data.createdDate ?? new Date().toISOString(),
  };

  const id = Number(data.id ?? 0);
  if (id > 0) {
    payload.id = id;
  }

  return payload;
};

export const getRelations = async () => {
  const response = await api.get(API.RELATIONS);
  return mapList(response.data, toUiRelation);
};

export const getRelationById = async (id) => {
  const response = await api.get(API.RELATION_BY_ID(id));
  return toUiRelation(response.data);
};

export const createRelation = async (data) => {
  const response = await api.post(API.RELATIONS, toApiRelation(data));
  return toUiRelation(response.data);
};

export const updateRelation = async (id, data) => {
  const response = await api.put(
    API.RELATION_BY_ID(id),
    toApiRelation({ ...data, id })
  );
  return toUiRelation(response.data);
};

export const deleteRelation = async (id) => {
  const response = await api.delete(API.RELATION_BY_ID(id));
  return response.data;
};
