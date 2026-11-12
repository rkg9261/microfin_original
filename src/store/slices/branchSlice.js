import { createCrudSlice } from "../createCrudSlice";
import {
  getBranches,
  createBranch as createBranchApi,
  updateBranch as updateBranchApi,
  deleteBranch as deleteBranchApi,
} from "../../api/branchApi";

const { reducer, actions } = createCrudSlice({
  name: "branch",
  api: {
    getAll: getBranches,
    create: createBranchApi,
    update: updateBranchApi,
    remove: deleteBranchApi,
  },
});

export const fetchBranches = actions.fetchAll;
export const createBranch = actions.createItem;
export const updateBranch = actions.updateItem;
export const deleteBranch = actions.deleteItem;

export default reducer;
