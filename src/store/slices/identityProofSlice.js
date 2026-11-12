import { createCrudSlice } from "../createCrudSlice";
import {
  getIdentityProofs,
  createIdentityProof as createIdentityProofApi,
  updateIdentityProof as updateIdentityProofApi,
  deleteIdentityProof as deleteIdentityProofApi,
} from "../../api/identityProofApi";

const { reducer, actions } = createCrudSlice({
  name: "identityProof",
  api: {
    getAll: getIdentityProofs,
    create: createIdentityProofApi,
    update: updateIdentityProofApi,
    remove: deleteIdentityProofApi,
  },
});

export const fetchIdentityProofs = actions.fetchAll;
export const createIdentityProof = actions.createItem;
export const updateIdentityProof = actions.updateItem;
export const deleteIdentityProof = actions.deleteItem;

export default reducer;
