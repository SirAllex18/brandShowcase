import React from "react";
import { Card, CardMedia, Typography, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import getImageUrl from "components/getImageUrl";

const NewsCard = ({ id, title, image, preview, content }) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/news/${id}`, { state: { title, image, preview, content } });
  };

  return (
    <Card
      sx={{
        m: 2,
        boxShadow: "none",
        border: 0,
        borderRadius: "16px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        
        "&:hover": { cursor: "pointer" },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="220"
        image={getImageUrl(image)}
        alt="News Image"
        sx={{
          width: "100%",
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1)",
            cursor: "pointer",
          },
        }}
      />
      <CardContent sx={{textAlign: "center"}}>
        <Typography variant="h5" color="text.primary">
          {preview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NewsCard;