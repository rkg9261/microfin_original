import { createCrudSlice } from "../createCrudSlice";
import {
  getPenaltySchemes,
  createPenaltyScheme as createPenaltySchemeApi,
  updatePenaltyScheme as updatePenaltySchemeApi,
  deletePenaltyScheme as deletePenaltySchemeApi,
} from "../../api/penaltySchemeApi";

const { reducer, actions } = createCrudSlice({
  name: "penaltyScheme",
  api: {
    getAll: getPenaltySchemes,
    create: createPenaltySchemeApi,
    update: updatePenaltySchemeApi,
    remove: deletePenaltySchemeApi,
  },
});

export const fetchPenaltySchemes = actions.fetchAll;
export const createPenaltyScheme = actions.createItem;
export const updatePenaltyScheme = actions.updateItem;
export const deletePenaltyScheme = actions.deleteItem;

export default reducer;
