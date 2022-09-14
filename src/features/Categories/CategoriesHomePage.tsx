import React from "react";
import CategoryList from "./CategoryList";
import { Stack } from "@mui/material";

const CategoriesHomePage = () => {
  return (
    <Stack spacing={4}>
      <CategoryList />
    </Stack>
  );
};

export default CategoriesHomePage;
