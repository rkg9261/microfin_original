import { createCrudSlice } from "../createCrudSlice";
import {
  getDistricts,
  createDistrict as createDistrictApi,
  updateDistrict as updateDistrictApi,
  deleteDistrict as deleteDistrictApi,
} from "../../api/districtApi";

const { reducer, actions } = createCrudSlice({
  name: "districtMaster",
  api: {
    getAll: getDistricts,
    create: createDistrictApi,
    update: updateDistrictApi,
    remove: deleteDistrictApi,
  },
});

export const fetchDistricts = actions.fetchAll;
export const createDistrict = actions.createItem;
export const updateDistrict = actions.updateItem;
export const deleteDistrict = actions.deleteItem;
export const { clearError } = actions;

export default reducer;
