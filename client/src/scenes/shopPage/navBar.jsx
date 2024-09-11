import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Avatar,
  useMediaQuery,
  Divider,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, removeFromCart, clearCart } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [open, setOpen] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.auth.cart);  
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = user ? `${user.firstName}` : "Log In";

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleRemoveFromCart = (id, size) => {
    dispatch(removeFromCart({ id, size }));
  };

  const total = cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const handleBuyButton = async () => {
    try {
      const cartItems = cart.map(item => ({
        productId: item.id,
        size: item.size,
        quantity: item.quantity
      }));
  
      const response = await fetch("https://brandshowcaseserver.vercel.app/store/products/updateQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setOpen(false);
        dispatch(clearCart());
      } else {
        console.log("Error:", data.message);
      }
    } catch (err) {
      console.log("Error", err);
    }
  }

  return (
    <>
      <FlexBetween padding="1rem 6%" backgroundColor="#F3F5F8">
        <FlexBetween gap="1.75rem">
          <Avatar
            src={`${process.env.PUBLIC_URL}/assets/logo.jpg`}
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                color: "blue",
                cursor: "pointer",
              },
              width: 56,
              height: 56,
            }}
          />
          <Divider orientation="vertical" flexItem />

          <FlexBetween gap="1.5rem" padding="0.1rem">
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              onClick={() => navigate("/store")}
              sx={{
                "&:hover": {
                  color: "#4169e1",
                  cursor: "pointer",
                },
              }}
            >
              Official Store
            </Typography>
          </FlexBetween>
        </FlexBetween>

        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", pr: "5rem" }}>
          {isNonMobileScreens && (
            <Typography variant="h5"> FC Sovereign Blues</Typography>
          )}
        </Box>

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween>
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: "#F3F5F8",
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: "#F3F5F8",
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName} onClick={ () => fullName === "Log In" ? navigate("/login") : ""}>
                  <Typography >{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={handleDialogOpen}>
              <Badge badgeContent={cart?.length || 0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor="#6CB4EE"
          >
            {/* CLOSE ICON */}
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="row" marginBottom="2rem">
              <Typography variant="h5"> Cosul de cumparaturi</Typography>
              <IconButton onClick={handleDialogOpen}>
                <Badge badgeContent={cart?.length || 0} color="secondary">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
            <FlexBetween
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="2rem"
            >
              <FormControl variant="standard" value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    width: "150px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName} onClick={ () => fullName === "Log In" ? navigate("/login") : ""}>
                    <Typography >{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}  
      </FlexBetween>

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Cosul tau</DialogTitle>
        <DialogContent>
          {cart?.length ? (
            <>
              {cart.map((item, index) => (
                <Box key={index} display="flex" alignItems="center" mb={2}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: 200, height: 200, marginRight: 10 }} />
                  <Box flexGrow={1}>
                    <Typography variant="h3">{item.title}</Typography>
                    <Typography variant="h4" fontWeight="bold" marginTop="1rem">${item.price}</Typography>
                    <Typography variant="h4">Cantitate: {item.quantity}</Typography>
                    <Box display="flex" justifyContent="right">
                      <IconButton onClick={() => handleRemoveFromCart(item.id, item.size)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))}
              <Typography variant="h4" align="right">Total: ${total.toFixed(2)}</Typography>
            </>
          ) : (
            <DialogContentText>Cosul tau este gol</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
        <Button onClick={handleDialogClose}>Inchide</Button>
          {cart?.length > 0 && (
            <Button onClick={handleBuyButton}>Cumpara</Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Navbar;
