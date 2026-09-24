import ProductApi from "$lib/api/product_api";
import ProductCategoryApi from "$lib/api/product_category_api";

import HashHelper from "$lib/helpers/hash_helper";
import FormatterHelper from "$lib/helpers/formatter_helper";

import type { CreateForm } from "./form";

async function fetchProductCategoryList() {
  let payload = {
    isPaginate: false,
    page: 1,
    perPage: 10,
    orderBy: "name",
    orderType: "asc",
  };

  return await ProductCategoryApi.getProductCategory(payload);
}

async function createProductData(createForm: CreateForm) {
  let payload = {
    productCategoryId: HashHelper.decrypt(createForm.productCategoryId),
    name: createForm.name,
    description: createForm.description,
    price: FormatterHelper.convertToInteger(createForm.price),
    publishedAt: createForm.publishedAt,
    photoFile: createForm.photoFile,
  };

  return await ProductApi.createProduct(payload);
}

export { fetchProductCategoryList, createProductData };
