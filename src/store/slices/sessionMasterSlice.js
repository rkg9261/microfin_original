import { createCrudSlice } from "../createCrudSlice";
import {
  getSessions,
  createSession as createSessionApi,
  updateSession as updateSessionApi,
  deleteSession as deleteSessionApi,
} from "../../api/sessionMasterApi";

const { reducer, actions } = createCrudSlice({
  name: "sessionMaster",
  api: {
    getAll: getSessions,
    create: createSessionApi,
    update: updateSessionApi,
    remove: deleteSessionApi,
  },
});

export const fetchSessions = actions.fetchAll;
export const createSession = actions.createItem;
export const updateSession = actions.updateItem;
export const deleteSession = actions.deleteItem;

export default reducer;
