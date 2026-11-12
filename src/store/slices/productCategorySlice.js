import { createCrudSlice } from "../createCrudSlice";
import {
  getProductCategories,
  createProductCategory as createProductCategoryApi,
  updateProductCategory as updateProductCategoryApi,
  deleteProductCategory as deleteProductCategoryApi,
} from "../../api/productCategoryApi";

const { reducer, actions } = createCrudSlice({
  name: "productCategory",
  api: {
    getAll: getProductCategories,
    create: createProductCategoryApi,
    update: updateProductCategoryApi,
    remove: deleteProductCategoryApi,
  },
});

export const fetchProductCategories = actions.fetchAll;
export const createProductCategory = actions.createItem;
export const updateProductCategory = actions.updateItem;
export const deleteProductCategory = actions.deleteItem;

export default reducer;
