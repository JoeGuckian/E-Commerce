import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productApiService } from "../../api-services/product.api-service";
import { CategoryNames, Product } from "../../types/product.types";
import ProductCard from "./ProductCard";

interface ProductListProps {
  catergoryName: CategoryNames | undefined;
}

const ProductList = (props: ProductListProps) => {
  const { catergoryName } = props;
  const [productList, setProductList] = useState<Array<Product>>([]);

  const navigate = useNavigate();

  const navigateToCategories = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchProductList = async () => {
      if (catergoryName !== undefined) {
        const result = await productApiService.getProductListByCategory(
          catergoryName
        );

        setProductList(result.data);
      }
    };

    fetchProductList();
  }, [catergoryName]);

  return (
    <>
      <Button
        onClick={navigateToCategories}
        variant="contained"
        style={{ marginBottom: 10 }}
      >
        Back to Catalog
      </Button>
      <Grid container rowSpacing={2} columnSpacing={4} direction="row">
        {productList.map((product) => (
          <Grid item md={6} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
