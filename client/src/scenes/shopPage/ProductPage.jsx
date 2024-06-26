import Navbar from "./navBar";
import {
  Box,
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
  TextField,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "state";
import AccordionProduct from "widgets/Accordion";
import { useState } from "react";
import Footer from "scenes/footer";

const ProductPage = () => {
  const location = useLocation();
  const {
    id,
    title,
    description,
    gender,
    materials,
    sizes,
    price,
    imageUrl,
    subCategory,
  } = location.state;
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const user = useSelector((state) => state.auth.user);
  const [availableQuantity, setAvailableQuantity] = useState(null);
 
  const handleAddToCart = () => {
    if (user) {
      if (selectedSize) {
        const product = {
          id,
          title,
          description,
          gender,
          materials,
          size: selectedSize,
          price,
          imageUrl,
          subCategory,
          quantity,
        };
        dispatch(addToCart(product));
        setQuantity(1)
      } else {
        alert("Selecteaza o marime!");
      }
    } else {
      alert("Trebuie mai intai sa te loghezi!");
    }
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > availableQuantity) {
      setQuantity(availableQuantity);
      alert(`Doar ${availableQuantity} produse sunt disponibile`);
    } else {
      setQuantity(value);
    }
  };

  const handleSizeClick = (sizeObj) => {
    if (selectedSize === sizeObj.size) {
      setSelectedSize(null);
      setAvailableQuantity(null);
      setQuantity(1);
    } else {
      setSelectedSize(sizeObj.size);
      setAvailableQuantity(sizeObj.quantity);
      setQuantity(1);
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{ display: "flex", justifyContent: "space-around", height: "100%" }}
      >
        <Box
          component="img"
          sx={{
            marginTop: "3rem",
            width: "50rem",
            height: "65rem",
            border: 3,
            borderColor: '#6CB4EE',
            borderRadius: 5
          }}
          src={imageUrl || `${process.env.PUBLIC_URL}/assets/item2.webp`}
          alt="Product Image"
        />
        <Box sx={{ marginTop: "2rem", width: "40%", height: "250px" }}>
          <Card variant="outlined" sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Acasa - {subCategory}
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ marginTop: "1rem" }}
              >
                {title}
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "0.4rem" }}>
                {price}$
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "2rem" }}
              >
                Dimensiuni:
              </Typography>
              <Box sx={{ marginTop: "0.75rem" }}>
                {sizes.map((item, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 5,
                      fontSize: "0.75rem",
                      padding: "2px 6px",
                      minWidth: "30px",
                      minHeight: "30px",
                      marginRight: "0.5rem",
                      backgroundColor:
                        selectedSize === item.size ? "blue" : "transparent",
                      color: selectedSize === item.size ? "white" : "inherit",
                      borderColor:
                        selectedSize === item.size ? "blue" : "inherit",
                    }}
                    onClick={() => handleSizeClick(item)}
                    disabled={item.quantity === 0}
                  >
                    {item.size}
                  </Button>
                ))}
              </Box>
              {availableQuantity !== null && (
                <TextField
                  id="filled-number"
                  label="Quantity"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ marginTop: "2rem", width: "8rem" }}
                  value={quantity}
                  onChange={handleQuantityChange}
                  inputProps={{ min: 1, max: availableQuantity }}
                />
              )}
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  marginBottom: "1rem",
                  mx: "1rem",
                  padding: "0.70rem",
                }}
                onClick={handleAddToCart}
              >
                Adauga in cos
              </Button>
            </CardActions>
          </Card>
          <Box sx={{ marginTop: "1rem" }}>
            <AccordionProduct description={description} materials={materials} />
          </Box>
        </Box>
      </Box>
      <Footer/>
    </>
  );
};

export default ProductPage;