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
} from "@mui/material";
import DropdownMenu from "./dropdown";
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from "@mui/icons-material/Language";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import { styled, alpha } from '@mui/material/styles';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.auth.cart);  // Get cart from state
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = user ? `${user.firstName} ${user.lastName}` : "Guest";

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

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
            <FlexBetween gap="1rem">
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Search>
              <DropdownMenu />
              <DropdownMenu />
              <DropdownMenu />
              <Typography>
                Hello
              </Typography>
            </FlexBetween>
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
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={() => navigate("/cart")}>
              <Badge badgeContent={cart?.length || 0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <LanguageIcon />
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
            backgroundColor="red"
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
                    "& .MuiSelect-select:focus": {
                      backgroundColor: "green",
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
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
    </>
  );
};

export default Navbar;
