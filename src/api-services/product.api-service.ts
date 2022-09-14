import { CategoryNames, Product } from "../types/product.types";
import { ApiResponse } from "../types/shared.types";

class ProductApiService {
  getProductCategories = async () => {
    const response = await fetch(
      `https://fakestoreapi.com/products/categories`
    );

    const apiResponse: ApiResponse<Array<CategoryNames>> = {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: await response.json(),
    };

    return apiResponse;
  };

  getProductListByCategory = async (
    catergoryName: string
  ): Promise<ApiResponse<Array<Product>>> => {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${catergoryName}`
    );

    const apiResponse: ApiResponse<Array<Product>> = {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data: await response.json(),
    };

    return apiResponse;
  };
}

export const productApiService = new ProductApiService();
