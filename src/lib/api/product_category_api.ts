import axios from "axios";

import CheckHelper from "$lib/helpers/check_helper";

let API_URL = import.meta.env.VITE_API_URL;
let BEARER_TOKEN = localStorage.getItem("token");

async function getProductCategory(request: any) {
  let url = `${API_URL}/api/product-category`;

  let params = {
    is_paginate: request.isPaginate,
    page: request.page,
    per_page: request.perPage,
    order_by: request.orderBy,
    order_type: request.orderType,
    ...CheckHelper.isset(request.filter) && {
      filter: request.filter,
    },
  };

  return await axios.get(url, {
    params: params,
    headers: {
      "Authorization": `Bearer ${BEARER_TOKEN}`,
    },
  }).then(res => {
    return res.data;
  }).catch(err => {
    return err.response.data;
  });
};

async function detailProductCategory(request: any) {
  let url = `${API_URL}/api/product-category/detail`;

  let params = {
    product_category_id: request.productCategoryId,
  };

  return await axios.get(url, {
    params: params,
    headers: {
      "Authorization": `Bearer ${BEARER_TOKEN}`,
    },
  }).then(res => {
    return res.data;
  }).catch(err => {
    return err.response.data;
  });
};

async function createProductCategory(request: any) {
  let url = `${API_URL}/api/product-category/create`;

  let formData = new FormData();

  formData.append('name', request.name);
  formData.append('description', request.description);

  return await axios.post(url, formData, {
    headers: {
      "Authorization": `Bearer ${BEARER_TOKEN}`,
    },
  }).then(res => {
    return res.data;
  }).catch(err => {
    return err.response.data;
  });
};

async function updateProductCategory(request: any) {
  let url = `${API_URL}/api/product-category/update`;

  let formData = new FormData();

  formData.append('product_category_id', request.productCategoryId);
  formData.append('name', request.name);
  formData.append('description', request.description);

  return await axios.post(url, formData, {
    headers: {
      "Authorization": `Bearer ${BEARER_TOKEN}`,
    },
  }).then(res => {
    return res.data;
  }).catch(err => {
    return err.response.data;
  });
};

async function deleteProductCategory(request: any) {
  let url = `${API_URL}/api/product-category/delete`;

  let params = {
    product_category_id: request.productCategoryId,
  };

  return await axios.delete(url, {
    params: params,
    headers: {
      "Authorization": `Bearer ${BEARER_TOKEN}`,
    },
  }).then(res => {
    return res.data;
  }).catch(err => {
    return err.response.data;
  });
};

export { getProductCategory, detailProductCategory, createProductCategory, updateProductCategory, deleteProductCategory };
