import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL;

const getProduct = async (page: number, perPage: number, orderBy: string, orderType: string) => {
  let token = localStorage.getItem("token");

  try {
    let response = await axios.get(`${API_URL}/api/product`, {
      params: {
        is_paginate: true,
        page: page,
        per_page: perPage,
        order_by: orderBy,
        order_type: orderType,
      },
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export { getProduct };