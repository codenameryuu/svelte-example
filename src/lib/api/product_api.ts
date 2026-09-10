import axios from "axios";

import CheckHelper from "$lib/helpers/check_helper";

let API_URL = import.meta.env.VITE_API_URL;
let BEARER_TOKEN = localStorage.getItem("token");

async function getProduct(request: any) {
  let url = `${API_URL}/api/product`;

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

async function detailProduct(request: any) {
  let url = `${API_URL}/api/product/detail`;

  let params = {
    product_id: request.productId,
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

async function createProduct(request: any) {
  let url = `${API_URL}/api/product/create`;

  let formData = new FormData();

  formData.append('product_category_id', request.productCategoryId);
  formData.append('name', request.name);
  formData.append('description', request.description);
  formData.append('price', request.price);
  formData.append('published_at', request.publishedAt);
  formData.append('photo_file', request.photoFile);

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

async function updateProduct(request: any) {
  let url = `${API_URL}/api/product/update`;

  let formData = new FormData();

  formData.append('product_id', request.productId);
  formData.append('product_category_id', request.productCategoryId);
  formData.append('name', request.name);
  formData.append('description', request.description);
  formData.append('price', request.price);
  formData.append('published_at', request.publishedAt);
  formData.append('photo_file', request.photoFile);

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

async function deleteProduct(request: any) {
  let url = `${API_URL}/api/product/delete`;

  let params = {
    product_id: request.productId,
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

export { getProduct, detailProduct, createProduct, updateProduct, deleteProduct };