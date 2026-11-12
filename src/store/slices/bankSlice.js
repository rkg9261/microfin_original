import { createCrudSlice } from "../createCrudSlice";
import {
  getBankMasters,
  createBankMaster as createBankMasterApi,
  updateBankMaster as updateBankMasterApi,
  deleteBankMaster as deleteBankMasterApi,
} from "../../api/bankApi";

const { reducer, actions } = createCrudSlice({
  name: "bank",
  api: {
    getAll: getBankMasters,
    create: createBankMasterApi,
    update: updateBankMasterApi,
    remove: deleteBankMasterApi,
  },
});

export const fetchBanks = actions.fetchAll;
export const createBankMaster = actions.createItem;
export const updateBankMaster = actions.updateItem;
export const deleteBankMaster = actions.deleteItem;

export default reducer;
