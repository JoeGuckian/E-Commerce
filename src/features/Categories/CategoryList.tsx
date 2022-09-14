import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { productApiService } from "../../api-services/product.api-service";
import { CategoryNames } from "../../types/product.types";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const [catergories, setCatergories] = useState<Array<CategoryNames>>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesResponse = await productApiService.getProductCategories();
      setCatergories(categoriesResponse.data);
    };

    fetchCategories();
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        {catergories.map((category) => (
          <Grid item xs={6} lg={6} key={category}>
            <CategoryCard categoryName={category} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryList;
