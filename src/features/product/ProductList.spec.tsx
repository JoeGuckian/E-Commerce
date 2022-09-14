import { render, screen, waitFor } from "@testing-library/react";
import { productApiService } from "../../api-services/product.api-service";
import { renderWithWrappers } from "../../utils/renderWithWrappers";
import { productApiResponse } from "./fixtures/fixtures";
import ProductList from "./ProductList";

describe("ProductList", () => {
  it("should render take a catergory prop and call the getProductListByCategory method", () => {
    const mock = jest.spyOn(productApiService, "getProductListByCategory");

    renderWithWrappers(<ProductList catergoryName="electronics" />);

    expect(mock).toHaveBeenCalledWith("electronics");
  });

  it("should render 6 cards when returned 6 products from the api call", async () => {
    jest
      .spyOn(productApiService, "getProductListByCategory")
      .mockResolvedValue(productApiResponse);

    renderWithWrappers(<ProductList catergoryName="electronics" />);

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card").length).toEqual(6);
    });
  });
});
