import api from "./axios";

// Get all products (public)
export const getProducts = async (params = {}) => {
  const { data } = await api.get("/products/", { params });
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  if (Array.isArray(data.products)) return data.products;
  return [];
};

// Get single product
export const getProduct = async (id) => {
  const { data } = await api.get(`/products/${id}/`);
  return data.product ?? data;
};

// Get product by slug
export const getProductBySlug = async (slug) => {
  const { data } = await api.get(`/products/slug/${slug}/`);
  return data.product ?? data;
};

// Admin: Create product
export const createProduct = async (productData) => {
  const { data } = await api.post("/products/admin/create/", productData);
  return data;
};

// Admin: Update product
export const updateProduct = async (id, productData) => {
  const { data } = await api.put(`/products/admin/${id}/update/`, productData);
  return data;
};

// Admin: Delete product
export const deleteProduct = async (id) => {
  const { data } = await api.delete(`/products/admin/${id}/delete/`);
  return data;
};

// Admin: Get stock overview
export const getStockOverview = async () => {
  const { data } = await api.get("/products/admin/stock/overview/");
  return data;
};

// Upload image (if you have a separate upload endpoint)
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const { data } = await api.post("/products/upload-image/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

export default {
  getProducts,
  getProduct,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getStockOverview,
  uploadImage,
};
