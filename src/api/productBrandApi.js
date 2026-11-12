import api from "./axiosInstance";
import API from "./endpoints";

const isActiveStatus = (data) => {
  if (data.isActive === true || data.isActive === false) return data.isActive;
  return String(data.status || "ACTIVE").toUpperCase() === "ACTIVE";
};

const toApiProductBrand = (data) => ({
  brandId: Number(data.brandId || data.id || 0),
  brandName: String(data.brandName || data.brand || "").trim(),
  brandCode: String(data.brandCode || data.code || "").trim(),
  remark: String(data.remark || "").trim(),
  isActive: isActiveStatus(data),
  createdDate: data.createdDate || data.createdAt || new Date().toISOString(),
  updatedDate: data.updatedDate || null,
});

const toUiProductBrand = (item) => ({
  ...item,
  id: item.brandId ?? item.id,
  brand: item.brandName || item.brand || "",
  code: item.brandCode || item.code || "",
  remark: item.remark || "",
  status:
    item.isActive === false || String(item.status || "").toUpperCase() === "INACTIVE"
      ? "INACTIVE"
      : "ACTIVE",
  createdAt: item.createdDate || item.createdAt || "",
});

export const getProductBrands = async () => {
  const response = await api.get(API.PRODUCT_BRANDS);
  const list = Array.isArray(response.data) ? response.data : [];
  return list.map(toUiProductBrand);
};

export const getProductBrandById = async (id) => {
  const response = await api.get(API.PRODUCT_BRAND_BY_ID(id));
  return toUiProductBrand(response.data);
};

export const createProductBrand = async (data) => {
  const response = await api.post(API.PRODUCT_BRANDS, toApiProductBrand(data));
  return toUiProductBrand(response.data);
};

export const updateProductBrand = async (id, data) => {
  const response = await api.put(
    API.PRODUCT_BRAND_BY_ID(id),
    toApiProductBrand({ ...data, id })
  );
  return toUiProductBrand(response.data);
};

export const deleteProductBrand = async (id) => {
  const response = await api.delete(API.PRODUCT_BRAND_BY_ID(id));
  return response.data;
};
