import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL;

const getProductCategory = async (page: number, perPage: number, orderBy: string, orderType: string) => {
  let token = localStorage.getItem("token");

  try {
    let response = await axios.get(`${API_URL}/api/product-category`, {
      params: {
        is_paginate: true,
        page: page,
        per_page: perPage,
        order_by: orderBy,
        order_type: orderType,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

const deleteProductCategory = async (id: number) => {
  let token = localStorage.getItem("token");

  try {
    let response = await axios.delete(`${API_URL}/api/product-category/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getProductCategory, deleteProductCategory };
