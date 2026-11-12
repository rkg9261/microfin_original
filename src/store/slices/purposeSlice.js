import { createCrudSlice } from "../createCrudSlice";
import {
  getPurposes,
  createPurpose as createPurposeApi,
  updatePurpose as updatePurposeApi,
  deletePurpose as deletePurposeApi,
} from "../../api/purposeApi";

const { reducer, actions } = createCrudSlice({
  name: "purpose",
  api: {
    getAll: getPurposes,
    create: createPurposeApi,
    update: updatePurposeApi,
    remove: deletePurposeApi,
  },
});

export const fetchPurposes = actions.fetchAll;
export const createPurpose = actions.createItem;
export const updatePurpose = actions.updateItem;
export const deletePurpose = actions.deleteItem;

export default reducer;
