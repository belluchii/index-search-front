const API_URL = import.meta.env.VITE_API_URL;

import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function fetchSearchProducts(paramsObj) {
  try {
    const { data } = await api.get("/products/search", {
      params: paramsObj,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function fetchAllProducts(paramsObj) {
  try {
    const { data } = await api.get("/products/all", {
      params: paramsObj,
    });
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function fetchPriceRange() {
  try {
    const { data } = await api.get("/maxminprice");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function fetchCategories() {
  try {
    const { data } = await api.get("/categories");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export default api;
