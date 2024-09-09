import React from "react";
import { Card, CardMedia, Typography, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainNews = ({ image, title }) => {
  const navigate = useNavigate();

  // const handleCardClick = () => {
  //   navigate("/news");
  // };
  return (
    <Card
      sx={{
        marginBottom: "1rem",
        display: "flex",
        borderRadius: "16px",
        width: "100%",
      }}
      // onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="220"
        image={image}
        alt="News Image"
        sx={{
          width: "80%",
          height: "auto",
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: "#f5f5f5",
          width: "23rem",
        }}
      >
        <Typography variant="h3">{title}</Typography>
      </CardContent>
    </Card>
  );
};

export default MainNews;
