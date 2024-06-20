import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImageGrid = () => {
  const [categories, setNewCategories] = useState([]);
  const navigate = useNavigate();
  const [navigateTo, setNavigateTo] = useState(null);

  const handleButtonClick = (title) => {
    setNavigateTo(title);
  };

  useEffect(() => {
    if (navigateTo) {
      navigate("/store/Category", { state: { title: navigateTo } });
    }
  }, [navigateTo, navigate]);

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("http://localhost:3001/store/products/uniqueCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: "T-shirts"
        }),
      });

      if (!response.ok) {
        throw new Error("Could not retrieve categories");
      }

      const data = await response.json();
      setNewCategories(data);
    };
    getCategories();
  }, []);

  const formatTitle = (title) => {
    return title.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  return (
    <Container sx={{ marginTop: "4rem" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {categories
            .filter((_, index) => index % 2 === 0)
            .map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "350px",
                  height: "400px",
                  backgroundImage: `url("/assets/itemShop2.jpg")`, 
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: 2,
                  marginRight: "1rem",
                  marginBottom: "1rem",
                  borderRadius: 4,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    textAlign: "center",
                    padding: 1,
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h6">{formatTitle(item.subCategory)}</Typography>
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{ mt: 1, fontSize: "1.2rem", color: "white"}}
                    onClick={() => handleButtonClick(item.subCategory )}
                  >
                    Shop now
                  </Button>
                </Box>
              </Box>
            ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "50px",
          }}
        >
          {categories
            .filter((_, index) => index % 2 !== 0)
            .map((item, index) => (
              <Box
                key={index}
                sx={{
                  position: "relative",
                  width: "350px",
                  height: "400px",
                  backgroundImage: `url("/assets/itemShop.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: 2,
                  marginBottom: "1rem",
                  borderRadius: 4,
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    width: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.5)",
                    color: "white",
                    textAlign: "center",
                    padding: 1,
                    borderRadius: 3,
                  }}
                >
                  <Typography variant="h6">{formatTitle(item.subCategory)}</Typography>
                  <Button
                    variant="outlined"
                    size="medium"
                    sx={{ mt: 1, color: "lightblue", fontSize: "1.2rem" }}
                    onClick={() => handleButtonClick(item.subCategory )}
                  >
                    Shop now
                  </Button>
                </Box>
              </Box>
            ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ImageGrid;
