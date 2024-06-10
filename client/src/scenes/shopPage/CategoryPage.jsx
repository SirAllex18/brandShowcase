import React, { useState, useEffect } from "react";
import Navbar from "./navBar";
import Footer from "scenes/loginPage/footer";
import { useLocation } from "react-router-dom";
import Item from "./Item";
import {
  Box,
  Button,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Grid,
  Container,
  Pagination
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FlexBetween from "components/FlexBetween";

const CategoryPage = () => {
  const [sortBy, setSortBy] = useState("Date");
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; 
  const location = useLocation();
  const { title } = location.state || {};
  const { categorySelected } = location.state || {}

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getProductsByCategory = async (categoryName, title) => {
    const response = await fetch(
      "http://localhost:3001/store/products/subCategory",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryName: categoryName,
          subCategory: title,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    setProducts(data);
  };

  const getAllProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/store/products/${categorySelected}`);
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (title) {
      getProductsByCategory("T-shirts", title);
    } else {
      getAllProducts(categorySelected);
    }
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Navbar />
      <Box display="flex" flexDirection="column" minHeight="100vh" marginX='4rem'>
          <Box>
            <FlexBetween>
              <Button
                variant="contained"
                size="large"
                startIcon={<FilterAltIcon />}
              >
                <Typography variant="h5">Filter</Typography>
              </Button>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ color: "#000080", marginRight: "0.5rem" }}>
                  Sort By:
                </Typography>
                <FormControl sx={{ m: 1, minWidth: 100, height: "auto" }}>
                  <Select
                    value={sortBy}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Date">Date</MenuItem>
                    <MenuItem value="Price">Price</MenuItem>
                    <MenuItem value="Price">Price</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </FlexBetween>
            <Grid container item xs={12} justifyContent="center" spacing={5}>
              {currentItems.map((item) => (
                <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                  <Item
                    title={item.name}
                    description={item.description}
                    gender={item.gender}
                    price={item.price}
                    materials={item.materials}
                    sizes={item.sizes}
                    imageUrl= "/assets/item1.webp"
                  />
                </Grid>
              ))}
            </Grid>
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(products.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CategoryPage;
