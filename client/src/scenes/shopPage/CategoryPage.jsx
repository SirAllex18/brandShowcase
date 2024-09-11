import React, { useState, useEffect } from "react";
import Navbar from "./navBar";
import Footer from "scenes/loginPage/footer";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
  Pagination,
  Drawer,
  FormGroup,
  Collapse,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FlexBetween from "components/FlexBetween";

const CategoryPage = () => {
  const [drawerState, setDrawerState] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const location = useLocation();
  const { title, categorySelected } = location.state || {};
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({
    kids: false,
    Unisex: false,
    female: false,
    male: false
  });

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChangeFilter = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions(prev => ({ ...prev, [name]: checked }));
  };

  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const getProductsByCategory = async (categoryName, title) => {
    const response = await fetch(
      "https://brandshowcaseserver.vercel.app/store/products/subCategory",
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
    const sortedData = sortProducts(data, sortBy);
    setProducts(sortedData);
    setFilteredProducts(sortedData);
  };

  const getAllProducts = async (categorySelected) => {
    try {
      const response = await fetch(
        `https://brandshowcaseserver.vercel.app/store/products/${categorySelected}`
      );
      const data = await response.json();
      const sortedData = sortProducts(data, sortBy);
      setProducts(sortedData);
      setFilteredProducts(sortedData);
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
  }, [title, categorySelected, sortBy]);

  useEffect(() => {
    filterProducts();
  }, [selectedOptions]);

  const sortProducts = (products, sortBy) => {
    switch (sortBy) {
      case "Date+":
        return products.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
      case "Date-":
        return products.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
      case "Price+":
        return products.sort((a, b) => a.price - b.price);
      case "Price-":
        return products.sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  };

  const filterProducts = () => {
    const activeFilters = Object.keys(selectedOptions).filter(
      key => selectedOptions[key]
    );
    if (activeFilters.length === 0) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        activeFilters.includes(product.gender)
      );
      setFilteredProducts(filtered);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        flexDirection="column"
        minHeight="100vh"
        marginX="4rem"
      >
        <Box>
          <FlexBetween>
            <Button
              variant="contained"
              size="large"
              startIcon={<FilterAltIcon />}
              onClick={() => setDrawerState(true)}
            >
              <Typography variant="h5">Filtru</Typography>
            </Button>
            <Drawer
              open={drawerState}
              onClose={() => setDrawerState(false)}
              sx={{
                "& .MuiDrawer-paper": {
                  width: "300px",
                  padding: "20px",
                },
              }}
            >
              <FlexBetween>
                <Typography variant="h5">Filtreaza dupa:</Typography>
                <CloseIcon
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => setDrawerState(false)}
                />
              </FlexBetween>
              <Divider flexItem sx={{ marginTop: "1rem" }} />
              <Box marginTop="1.5rem">
                <Button
                  variant="outlined"
                  onClick={handleToggle}
                  endIcon={<ExpandMoreIcon />}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    textTransform: "none",
                    backgroundColor: "#f0f4ff",
                    color: "#0000ff",
                    "&:hover": {
                      backgroundColor: "#e0e4ff",
                    },
                  }}
                >
                  <Typography variant="h6">Gen</Typography>
                </Button>
                <Collapse in={open}>
                  <FormGroup sx={{ paddingLeft: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedOptions.kids}
                          onChange={handleChangeFilter}
                          name="kids"
                        />
                      }
                      label="Copii"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedOptions.Unisex}
                          onChange={handleChangeFilter}
                          name="Unisex"
                        />
                      }
                      label="Unisex"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedOptions.female}
                          onChange={handleChangeFilter}
                          name="female"
                        />
                      }
                      label="Femei"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedOptions.male}
                          onChange={handleChangeFilter}
                          name="male"
                        />
                      }
                      label="Barbati"
                    />
                  </FormGroup>
                </Collapse>
              </Box>
            </Drawer>
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
                  <MenuItem value="Date+">Data - Crescator </MenuItem>
                  <MenuItem value="Date-">Data - Descrescator </MenuItem>
                  <MenuItem value="Price+">Pret - Crescator </MenuItem>
                  <MenuItem value="Price-">Pret - Descrescator </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </FlexBetween>
          <Grid container item xs={12} justifyContent="center" spacing={3}>
            {currentItems.map((item) => (
              <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                <Item
                  flag={true}
                  id={item._id}
                  title={item.name}
                  description={item.description}
                  gender={item.gender}
                  price={item.price}
                  materials={item.materials}
                  sizes={item.sizes}
                  imageUrl={item.imageUrl}
                />
              </Grid>
            ))}
          </Grid>
          <Box mt={6} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(filteredProducts.length / itemsPerPage)}
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
