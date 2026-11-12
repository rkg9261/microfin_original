import { createCrudSlice } from "../createCrudSlice";
import {
  getDesignations,
  createDesignation as createDesignationApi,
  updateDesignation as updateDesignationApi,
  deleteDesignation as deleteDesignationApi,
} from "../../api/designationApi";

const { reducer, actions } = createCrudSlice({
  name: "designation",
  api: {
    getAll: getDesignations,
    create: createDesignationApi,
    update: updateDesignationApi,
    remove: deleteDesignationApi,
  },
});

export const fetchDesignations = actions.fetchAll;
export const createDesignation = actions.createItem;
export const updateDesignation = actions.updateItem;
export const deleteDesignation = actions.deleteItem;
export const { clearError } = actions;

export default reducer;
