import { createCrudSlice } from "../createCrudSlice";
import {
  getRegions,
  createRegion as createRegionApi,
  updateRegion as updateRegionApi,
  deleteRegion as deleteRegionApi,
} from "../../api/regionApi";

const { reducer, actions } = createCrudSlice({
  name: "region",
  api: {
    getAll: getRegions,
    create: createRegionApi,
    update: updateRegionApi,
    remove: deleteRegionApi,
  },
});

export const fetchRegions = actions.fetchAll;
export const createRegion = actions.createItem;
export const updateRegion = actions.updateItem;
export const deleteRegion = actions.deleteItem;

export default reducer;
