import React from "react";
import { useCartContext } from "../../context/cart-context";
import ProductList from "./ProductList";

const ProductHomePage = () => {
  const cartContext = useCartContext();
  return <ProductList catergoryName={cartContext?.state.category} />;
};

export default ProductHomePage;
