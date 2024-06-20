import NavBar from "./navBar";
import Item from "./Item";
import ImageGrid from "widgets/ImageGrid";
import { useEffect, useState } from "react";
import { Typography, Button, Box, Grid, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShopPage = () => {
  const [productsButtons, setNewButtons] = useState([]);
  const [products, setNewProducts] = useState([]);
  const [categorySelected, setSelectedCategory] = useState();
  const defaultCategoryId = "6664c24026942ca480044689";
  const navigateTo = useNavigate();

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await fetch("http://localhost:3001/store/categories");
        const data = await response.json();
        setNewButtons(data);
      } catch (err) {
        console.log(err);
      }
    };
    getAllCategories();
  }, []);

  const getProductsByCategory = async (categoryId = defaultCategoryId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/store/products/${categoryId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setNewProducts(data.slice(0, 4));
      setSelectedCategory(categoryId);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProductsByCategory();
  }, []);

  return (
    <>
      <NavBar />
      <Typography
        variant="h3"
        textAlign={"center"}
        sx={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        Trending now
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}
      >
        {productsButtons.map((item, index) => (
          <Button
            variant="outlined"
            key={index}
            sx={{ mx: "1rem", borderRadius: 5 }}
            onClick={() => getProductsByCategory(item._id)}
          >
            {item.name}
          </Button>
        ))}
      </Box>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {products.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Item
                title={item.name}
                description={item.description}
                gender={item.gender}
                materials={item.materials}
                sizes={item.sizes}
                price={item.price}
                imageUrl={item.imageUrl}
                id={item._id}
                subCategory={item.subCategory}
              />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
        >
          <Button
            variant="contained"
            onClick={() =>
              navigateTo("/store/Category", { state: { categorySelected } })
            }
          >
            Show more
          </Button>
        </Box>
      </Container>
      <ImageGrid />
    </>
  );
};

export default ShopPage;
