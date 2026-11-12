import { createCrudSlice } from "../createCrudSlice";
import {
  getLeaveMasters,
  createLeaveMaster as createLeaveMasterApi,
  updateLeaveMaster as updateLeaveMasterApi,
  deleteLeaveMaster as deleteLeaveMasterApi,
} from "../../api/leaveApi";

const { reducer, actions } = createCrudSlice({
  name: "leave",
  api: {
    getAll: getLeaveMasters,
    create: createLeaveMasterApi,
    update: updateLeaveMasterApi,
    remove: deleteLeaveMasterApi,
  },
});

export const fetchLeaves = actions.fetchAll;
export const createLeaveMaster = actions.createItem;
export const updateLeaveMaster = actions.updateItem;
export const deleteLeaveMaster = actions.deleteItem;

export default reducer;
