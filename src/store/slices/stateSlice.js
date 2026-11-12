import { createCrudSlice } from "../createCrudSlice";
import {
  getStates,
  createState as createStateApi,
  updateState as updateStateApi,
  deleteState as deleteStateApi,
} from "../../api/stateApi";

const { reducer, actions } = createCrudSlice({
  name: "stateMaster",
  api: {
    getAll: getStates,
    create: createStateApi,
    update: updateStateApi,
    remove: deleteStateApi,
  },
});

export const fetchStates = actions.fetchAll;
export const createState = actions.createItem;
export const updateState = actions.updateItem;
export const deleteState = actions.deleteItem;
export const { clearError } = actions;

export default reducer;
