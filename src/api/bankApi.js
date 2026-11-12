import api from "./axiosInstance";
import API from "./endpoints";
import { mapList } from "./createResourceApi";

const toUiBank = (bank) => ({
  ...bank,
  id: bank.bankId ?? bank.id,
  name: bank.bankName ?? bank.name,
  shortName: bank.bankCode ?? bank.shortName,
  status:
    bank.isActive === false
      ? "INACTIVE"
      : (bank.status || "ACTIVE").toString().toUpperCase(),
});

const toApiBank = (data) => ({
  bankId: Number(data.bankId ?? data.id ?? 0),
  bankName: data.bankName ?? data.name ?? "",
  bankCode: data.bankCode ?? data.shortName ?? "",
  ifsc: data.ifsc ?? "",
  branchName: data.branchName ?? "",
  accountNo: data.accountNo ?? "",
  isActive:
    data.isActive ??
    String(data.status || "ACTIVE").toUpperCase() === "ACTIVE",
  createdBy: Number(data.createdBy ?? 0),
  createdDate: data.createdDate ?? new Date().toISOString(),
  modifiedBy: Number(data.modifiedBy ?? 0),
  modifiedDate: new Date().toISOString(),
});

export const getBankMasters = async () => {
  const response = await api.get(API.BANKS);
  return mapList(response.data, toUiBank);
};

export const getBankMasterById = async (id) => {
  const response = await api.get(API.BANK_BY_ID(id));
  return toUiBank(response.data);
};

export const createBankMaster = async (data) => {
  const response = await api.post(API.BANKS, toApiBank(data));
  return response.data;
};

export const updateBankMaster = async (id, data) => {
  const response = await api.put(API.BANK_BY_ID(id), toApiBank({ ...data, id }));
  return response.data;
};

export const deleteBankMaster = async (id) => {
  const response = await api.delete(API.BANK_BY_ID(id));
  return response.data;
};
