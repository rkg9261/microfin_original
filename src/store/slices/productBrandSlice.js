import { createCrudSlice } from "../createCrudSlice";
import {
  getProductBrands,
  createProductBrand as createProductBrandApi,
  updateProductBrand as updateProductBrandApi,
  deleteProductBrand as deleteProductBrandApi,
} from "../../api/productBrandApi";

const { reducer, actions } = createCrudSlice({
  name: "productBrand",
  api: {
    getAll: getProductBrands,
    create: createProductBrandApi,
    update: updateProductBrandApi,
    remove: deleteProductBrandApi,
  },
});

export const fetchProductBrands = actions.fetchAll;
export const createProductBrand = actions.createItem;
export const updateProductBrand = actions.updateItem;
export const deleteProductBrand = actions.deleteItem;

export default reducer;
