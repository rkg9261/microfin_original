import api from "./axiosInstance";
import API from "./endpoints";

const isActiveStatus = (data) => {
  if (data.isActive === true || data.isActive === false) return data.isActive;
  return String(data.status || "ACTIVE").toUpperCase() === "ACTIVE";
};

const toApiProductCategory = (data) => ({
  id: Number(data.id || 0),
  categoryName: String(data.categoryName || data.category || "").trim(),
  categoryCode: String(data.categoryCode || data.code || "").trim(),
  isActive: isActiveStatus(data),
  createdDate: data.createdDate || data.createdAt || new Date().toISOString(),
  updatedDate: data.updatedDate || null,
});

const toUiProductCategory = (item) => ({
  ...item,
  category: item.categoryName || item.category || "",
  code: item.categoryCode || item.code || "",
  remark: item.remark || "",
  status:
    item.isActive === false || String(item.status || "").toUpperCase() === "INACTIVE"
      ? "INACTIVE"
      : "ACTIVE",
  createdAt: item.createdDate || item.createdAt || "",
});

export const getProductCategories = async () => {
  const response = await api.get(API.PRODUCT_CATEGORIES);
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(toUiProductCategory);
};

export const getProductCategoryById = async (id) => {
  const response = await api.get(API.PRODUCT_CATEGORY_BY_ID(id));
  return toUiProductCategory(response.data);
};

export const createProductCategory = async (data) => {
  const response = await api.post(API.PRODUCT_CATEGORIES, toApiProductCategory(data));
  return toUiProductCategory(response.data);
};

export const updateProductCategory = async (id, data) => {
  const response = await api.put(
    API.PRODUCT_CATEGORY_BY_ID(id),
    toApiProductCategory({ ...data, id })
  );
  return toUiProductCategory(response.data);
};

export const deleteProductCategory = async (id) => {
  const response = await api.delete(API.PRODUCT_CATEGORY_BY_ID(id));
  return response.data;
};
