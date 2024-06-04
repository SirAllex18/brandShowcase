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
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LanguageIcon from "@mui/icons-material/Language";
import { Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import FlexBetween from "components/FlexBetween";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = user ? user : "Log In";
  const handleShopClick = () => {
    navigate("/store");
  };
  const handleTeamClick = () => {
    navigate("/players");
  };

  const handleSelectClick = () => {
    navigate("/login")
  };
  return (
    <FlexBetween padding="0.75rem 6%" backgroundColor="#F3F5F8">
      <FlexBetween gap="1.75rem">
        <Avatar
          src={`${process.env.PUBLIC_URL}/assets/logo.jpg`}
          onClick={() => navigate("/home")}
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
            onClick={() => navigate("/")}
            sx={{
              "&:hover": {
                color: "#4169e1",
                cursor: "pointer",
              },
            }}
          >
            Sovereign Blues FC
          </Typography>
        </FlexBetween>
      </FlexBetween>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          pr: "5rem",
        }}
      >
        {isNonMobileScreens && (
          <FlexBetween gap="1rem">
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "blue",
                  cursor: "pointer",
                },
              }}
              onClick={handleTeamClick}
            >
              Prima echipă
            </Typography>
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "blue",
                  cursor: "pointer",
                },
              }}
            >
              Evenimente
            </Typography>
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "blue",
                  cursor: "pointer",
                },
              }}
            >
              Bilete
            </Typography>
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "blue",
                  cursor: "pointer",
                },
              }}
            >
              Istorie
            </Typography>
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "blue",
                  cursor: "pointer",
                },
              }}
              onClick={handleShopClick}
            >
              Magazin
            </Typography>
          </FlexBetween>
        )}
      </Box>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween>
          {fullName === "Log In" ? (
            <Button
              variant="outlined"
              startIcon={<PersonOutlineSharpIcon />}
              sx={{ marginRight: "1rem", borderRadius: 3 }}
              onClick={handleSelectClick}
            >
              <Typography fontSize="0.8rem">Sign In</Typography>
            </Button>
          ) : (
            <Box>
              <Typography>Welcome, {fullName}! </Typography>
              <Button
                variant="outlined"
                startIcon={<ManageAccountsIcon />}
                sx={{ marginRight: "1rem", borderRadius: 3 }}
              >
                <Typography fontSize="0.8rem">Account</Typography>
              </Button>
            </Box>
          )}

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
                value="{fullName}"
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
                <MenuItem value="">
                  <Typography>""</Typography>
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
  );
};

export default Navbar;
