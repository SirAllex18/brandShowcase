import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Item = ({
  title,
  description,
  gender,
  materials,
  sizes,
  price,
  imageUrl,
  id,
  subCategory
}) => {
  const navigateTo = useNavigate();
  const handleCardClick = () => {
    navigateTo(`/store/${id}`, {
      state: { title, description, gender, materials, sizes, price, imageUrl, subCategory },
    });
  };
  return (
    <Card
      sx={{
        maxWidth: 500,
        borderRadius: 4,
        boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          color: "blue",
          cursor: "pointer",
        },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={imageUrl || "/assets/item2.webp"}
        title="Product Image"
  
      />
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "150px",
        }}
      >
        <Typography gutterBottom variant="h6" sx={{ height: "2rem" }}>
          {title} {gender}
        </Typography>
        <Divider variant="middle" />
        <Typography variant="h6" marginLeft="2rem" my="0.5rem">
          ${price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Item;
