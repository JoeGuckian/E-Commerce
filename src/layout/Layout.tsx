import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Outlet, useNavigate } from "react-router-dom";
import React from "react";
import { useCartContext } from "../context/cart-context";

const Layout = () => {
  const cartContext = useCartContext();
  const navigate = useNavigate();

  //AppBar should be refactored out into it's own component
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div onClick={() => navigate("/")}>
              <Typography variant="h6" color="inherit" noWrap>
                Ecommerce
              </Typography>
            </div>
            <Badge
              badgeContent={cartContext?.state.quantity || 0}
              color="secondary"
              sx={{ marginLeft: "auto" }}
            >
              <ShoppingCartIcon sx={{ mr: 2 }} />
            </Badge>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Container
          sx={{ py: 8, paddingLeft: 24, paddingRight: 24 }}
          maxWidth="md"
        >
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default Layout;
