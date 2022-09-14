import React, { useEffect } from "react";
import "./App.css";
import Login from "./features/login/Login";
import { Route, Routes } from "react-router-dom";
import CategoriesHomePage from "./features/Categories/CategoriesHomePage";
import Layout from "./layout/Layout";
import ProductHomePage from "./features/product/ProductHomePage";
import ProtectedRoutes from "./routing/ProtectedRoutes";
import { useCartContext } from "./context/cart-context";

function App() {
  const cartContext = useCartContext();

  useEffect(() => {
    console.log(cartContext?.state.cart);
  }, [cartContext?.state.cart]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/" element={<CategoriesHomePage />} />
            <Route path="/products" element={<ProductHomePage />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
