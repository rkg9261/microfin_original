import { createCrudSlice } from "../createCrudSlice";
import {
  getRelations,
  createRelation as createRelationApi,
  updateRelation as updateRelationApi,
  deleteRelation as deleteRelationApi,
} from "../../api/relationApi";

const { reducer, actions } = createCrudSlice({
  name: "relation",
  api: {
    getAll: getRelations,
    create: createRelationApi,
    update: updateRelationApi,
    remove: deleteRelationApi,
  },
});

export const fetchRelations = actions.fetchAll;
export const createRelation = actions.createItem;
export const updateRelation = actions.updateItem;
export const deleteRelation = actions.deleteItem;

export default reducer;
