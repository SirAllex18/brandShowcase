import { useState, useEffect } from "react";
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Menu, Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state";
import FlexBetween from "components/FlexBetween";
import PersonOutlineSharpIcon from "@mui/icons-material/PersonOutlineSharp";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [openAccountDialog, setOpenAccountDialog] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const fullName = user ? `${user.firstName}` : "Log In";
  const handleShopClick = () => {
    navigate("/store");
  };
  const handleTeamClick = () => {
    navigate("/players");
  };

  const handleSelectClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(setLogout());
    setOpenAccountDialog(false);
  };

  const handleDialogClose = () => {
    setOpenAccountDialog(false);
  };

  const calculateAccountAge = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const differenceInTime = today - createdDate;
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };

  const accountAge = user ? calculateAccountAge(user.createdAt) : null;

  const handleDeleteAccount = async () => {
    try{
      const idUser = user._id;
      const emailUser = user.email;
      const deleteUser = await fetch("http://localhost:3001/auth/deleteUser", {
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({
          id: idUser,
          email: emailUser
        })
      })
      if(deleteUser.status === 200){
        console.log("User succesfully deleted!")
        dispatch(setLogout())
        setOpenAccountDialog(false)
      }else{
        alert("Error! Try again")
      }
    
    }catch(err){
      console.log(err)
    }
  }

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling down
      setIsNavbarVisible(false);
    } else {
      // Scrolling up
      setIsNavbarVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <FlexBetween
      padding="0.75rem 2%"
      backgroundColor="#F3F5F8"
      style={{ transition: 'top 0.3s', top: isNavbarVisible ? '0' : '-80px', position: 'fixed', width: '100%', zIndex: 1000 }}
    >
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
              onClick={() => navigate("/matches")}
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
              onClick={() => navigate("/history")}
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
            <Box
              sx={{
                marginRight: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Typography>Welcome, {fullName} </Typography>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ManageAccountsIcon />}
                sx={{ borderRadius: 3 }}
                onClick={() => setOpenAccountDialog(true)}
              >
                <Typography fontSize="0.7rem">Account</Typography>
              </Button>
            </Box>
          )}
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
          <Box display="flex" justifyContent="space-evenly" flexDirection="column" alignItems="center">
          <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "white",
                  cursor: "pointer",
                },
                marginTop: "0.5rem"
              }}
              onClick={handleTeamClick}
            >
              Prima echipă
            </Typography>
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "white",
                  cursor: "pointer",
                },
                marginTop: "0.5rem"
              }}
              onClick={() => navigate("/matches")}
            >
              Evenimente
            </Typography>
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "white",
                  cursor: "pointer",
                },
                marginTop: "0.5rem"
              }}
              onClick={() => navigate("/history")}
            >
              Istorie
            </Typography>
            <Typography
              fontSize="clamp(0.75rem, 1rem, 1.5rem)"
              sx={{
                "&:hover": {
                  color: "white",
                  cursor: "pointer",
                },
                marginTop: "0.5rem"
              }}
              onClick={handleShopClick}
            >
              Magazin
            </Typography>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="2rem"
            marginTop="2rem"
          >
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 3.5rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
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

      {/* ACCOUNT DIALOG */}
      <Dialog
        open={openAccountDialog}
        onClose={() => setOpenAccountDialog(false)}
      >
        <FlexBetween>
          <DialogTitle>Account Details</DialogTitle>
          <CloseIcon
            onClick={handleDialogClose}
            sx={{
              marginRight: "1rem",
              "&:hover": {
                color: "#6CB4EE",
                cursor: "pointer",
              },
            }}
          />
        </FlexBetween>
        <DialogContent>
          <DialogContentText>
            Salutare {fullName}, esti un membru al clubului de {accountAge}{" "}
            zile, iti multumim!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAccount}> Stergere cont </Button>
          <Button onClick={handleLogout} color="primary" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </FlexBetween>
  );
};

export default Navbar;
