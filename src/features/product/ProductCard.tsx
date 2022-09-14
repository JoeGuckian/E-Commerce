import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useCartContext } from "../../context/cart-context";
import { Product } from "../../types/product.types";
import { formatCurrency } from "../../utils/utils";

interface ProductProps {
  product: Product;
}

const ProductCard = (props: ProductProps) => {
  const { product } = props;
  const { title, price, image, rating } = product;

  const cartContext = useCartContext();

  const handleAddToCart = () => {
    cartContext?.dispatch({ type: "add", payload: product });
  };

  const handleRemoveFromCart = () => {
    cartContext?.dispatch({ type: "remove", payload: product });
  };

  const quantity = useMemo(
    () => cartContext?.state.cart.find((x) => x.id === product.id)?.quantity,
    [cartContext?.state.cart, product.id]
  );

  return (
    <Card
      sx={{
        width: 350,
        height: 380,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      data-testid="product-card"
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CardMedia
          component="img"
          sx={{
            height: 150,
            width: "auto",
          }}
          image={image}
          alt={title}
        />
      </div>
      <CardContent>
        <Stack direction="row">
          <Rating
            data-testid="rating"
            size="small"
            name="read-only"
            value={rating.rate}
            readOnly
            precision={0.5}
          />
          <Typography variant="caption">{`${rating.count} reviews`}</Typography>
        </Stack>
        <Typography gutterBottom variant="subtitle1" component="div">
          {title}
        </Typography>
        <Typography variant="subtitle2">{formatCurrency(price)}</Typography>
        {quantity && (
          <Typography variant="subtitle2">Quantity: {quantity}</Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          onClick={handleAddToCart}
          color="primary"
        >
          Add to Cart
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleRemoveFromCart}
          color="secondary"
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
