import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
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
  subCategory,
  flag
}) => {
  const navigateTo = useNavigate();
  const handleCardClick = () => {
    navigateTo(`/store/${id}`, {
      state: { id, title, description, gender, materials, sizes, price, imageUrl, subCategory },
    });
  };
  let heightCategory = "350px"
  if(flag === true){
    heightCategory = "700px"
  }
  return (
    <Card
      sx={{
        maxwidth: 300,
        height: "auto",
        borderRadius: 4,
        boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.2)",
        "&:hover": {
          color: "blue",
          cursor: "pointer",
        },
        display: "flex",
        flexDirection: "column"
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        image={imageUrl}
        title="Product Image"
        sx={{
          objectFit: "cover",
          height: heightCategory
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1, 
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography gutterBottom variant="h6" textAlign="left" sx={{ height: "2rem", marginTop: "1.4rem" }}>
          {title} {gender}
        </Typography>
        <Divider />
        <Typography variant="h6" my="0.5rem" textAlign="left">
          ${price}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Item;
