import axios from "axios";

import AuthHelper from "$lib/helpers/auth_helper";
import CheckHelper from "$lib/helpers/check_helper";

let API_URL = import.meta.env.VITE_API_URL;

export default class ProductCategoryApi {
  /**
   ** Get product category
   *
   * @param request
   * @return object
   */
  public static async getProductCategory(request: any) {
    let url = `${API_URL}/api/product-category`;

    let session = AuthHelper.getSession();
    let token = session.token;

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
        "Authorization": `Bearer ${token}`,
      },
    }).then(res => {
      return res.data;
    }).catch(err => {
      return err.response.data;
    });
  }

  /**
   ** Detail product category
   *
   * @param request
   * @return object
   */
  public static async detailProductCategory(request: any) {
    let url = `${API_URL}/api/product-category/detail`;

    let session = AuthHelper.getSession();
    let token = session.token;

    let params = {
      product_category_id: request.productCategoryId,
    };

    return await axios.get(url, {
      params: params,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(res => {
      return res.data;
    }).catch(err => {
      return err.response.data;
    });
  }

  /**
  ** Create product category
  *
  * @param request
  * @return object
  */
  public static async createProductCategory(request: any) {
    let url = `${API_URL}/api/product-category/create`;

    let session = AuthHelper.getSession();
    let token = session.token;

    let formData = new FormData();

    formData.append('name', request.name);
    formData.append('description', request.description);

    return await axios.post(url, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(res => {
      return res.data;
    }).catch(err => {
      return err.response.data;
    });
  }

  /**
 ** Update product category
 *
 * @param request
 * @return object
 */
  public static async updateProductCategory(request: any) {
    let url = `${API_URL}/api/product-category/update`;

    let session = AuthHelper.getSession();
    let token = session.token;

    let formData = new FormData();

    formData.append('product_category_id', request.productCategoryId);
    formData.append('name', request.name);
    formData.append('description', request.description);

    return await axios.post(url, formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(res => {
      return res.data;
    }).catch(err => {
      return err.response.data;
    });
  }

  /**
 ** Delete product category
 *
 * @param request
 * @return object
 */
  public static async deleteProductCategory(request: any) {
    let url = `${API_URL}/api/product-category/delete`;

    let session = AuthHelper.getSession();
    let token = session.token;

    let params = {
      product_category_id: request.productCategoryId,
    };

    return await axios.delete(url, {
      params: params,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    }).then(res => {
      return res.data;
    }).catch(err => {
      return err.response.data;
    });
  }
}
