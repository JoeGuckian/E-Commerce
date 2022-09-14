import { Card, CardMedia, Typography } from "@mui/material";
import electronicsImage from "./images/davide-boscolo-gz9njd0zYbQ-unsplash.jpg";
import jeweleryImage from "./images/sandy-millar-8vaQKYnawHw-unsplash.jpg";
import womensClothingImage from "./images/priscilla-du-preez-dlxLGIy-2VU-unsplash.jpg";
import mensClothingImage from "./images/nimble-made-7RIMS-NMsbc-unsplash.jpg";
import React from "react";
import { CategoryNames } from "../../types/product.types";
import { convertToTitleCase } from "../../utils/utils";
import { useCartContext } from "../../context/cart-context";
import { useNavigate } from "react-router-dom";

interface CatergoryCardProps {
  categoryName: CategoryNames;
}

const catergoryImages = {
  electronics: electronicsImage,
  jewelery: jeweleryImage,
  "men's clothing": mensClothingImage,
  "women's clothing": womensClothingImage,
};

const CategoryCard = (props: CatergoryCardProps) => {
  const { categoryName } = props;
  const cartContext = useCartContext();
  const navigate = useNavigate();

  const handleClick = () => {
    cartContext?.dispatch({ type: "update-category", payload: categoryName });
    navigate("/products");
  };

  return (
    <Card
      style={{ position: "relative", textAlign: "center" }}
      onClick={handleClick}
      sx={{ ":hover": { boxShadow: 10, background: "rgba(0, 0, 0, 0.5)" } }}
    >
      <CardMedia
        image={catergoryImages[categoryName]}
        style={{ height: 0, paddingTop: "56.25%" }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          background: "rgba(0, 0, 0, 0.5)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography
          variant="h5"
          color="white"
          style={{
            top: "50%",
            left: "50%",
            position: "absolute",
            transform: "translate(-50%, -50%)",
          }}
        >
          {convertToTitleCase(categoryName)}
        </Typography>
      </div>
    </Card>
  );
};

export default CategoryCard;
