import React from "react";
import {
  Typography,
  Box,
  CardMedia,
  Container,
  TextField,
  Avatar,
  Button,
  Alert,
  Snackbar
} from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const MainSponsors = [
  "/assets/spotify.png",
  "/assets/hp.png",
  "/assets/audi-logo.png",
];

const sponsors = [
  "/assets/cola.png",
  "/assets/easports.png",
  "/assets/adobe.png",
  "/assets/playstation.png",
  "/assets/cannon.png",
  "/assets/cisco.png",
  "/assets/nivea.png",
  "/assets/dubai.png",
];

const Footer = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("success");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubscribe = async () => {
    try {
      if (!email) {
        setAlertMessage("Introduce-ti adresa de email!");
        setAlertSeverity("warning");
        setAlertOpen(true);
        return;
      }
      const response = await fetch("http://localhost:3001/auth/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setEmail("");
        setAlertMessage("Subscribtion successful!");
        setAlertSeverity("success");
        setAlertOpen(true);
        setTimeout(() => setAlertOpen(false), 3000);
      } else {
        setAlertMessage("Failed to subscribe email!");
        setAlertSeverity("error");
        setAlertOpen(true);
      }
    } catch (err) {
      setAlertMessage("Error submitting email!");
      setAlertSeverity("error");
      setAlertOpen(true);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "5rem",
        }}
      >
        <Divider flexItem sx={{ marginBottom: "3rem" }} />
        <Typography variant="h5" sx={{ marginBottom: "1.5rem" }}>
          Aboneaza-te la Newslatter-ul nostru pentru ultimele noutati!
        </Typography>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: "1.5rem" }}
          onClick={handleSubscribe}
        >
          Subscribe
        </Button>
        <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={alertSeverity} onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      </Snackbar>
        <Divider flexItem sx={{ marginTop: "3rem" }} />
      </Box>
      <Container sx={{ marginTop: "100px" }}>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {MainSponsors.map((logo, index) => (
            <Grid item xs={6} sm={4} md={3} lg={4} key={index}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CardMedia
                  component="img"
                  image={logo}
                  alt={`Sponsor logo ${index + 1}`}
                  sx={{ maxWidth: "60%", height: "auto" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {sponsors.map((logo, index) => (
            <Grid item xs={6} sm={4} md={3} lg={3} key={index}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "40px",
                }}
              >
                <CardMedia
                  component="img"
                  image={logo}
                  alt={`Sponsor logo ${index + 1}`}
                  sx={{ maxWidth: "30%", height: "auto" }}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
      <FlexBetween>
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
        <FlexBetween>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookTwoToneIcon sx={{ margin: "1rem" }} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon sx={{ margin: "1rem" }} />
          </a>
          <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <XIcon sx={{ margin: "1rem" }} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon sx={{ margin: "1rem" }} />
          </a>
        </FlexBetween>
      </FlexBetween>
      <Divider flexItem sx={{ margin: "5px" }} />
      <FlexBetween>
        <Typography>Soverign Blues All rights reserved</Typography>
        <FlexBetween>
          <Typography sx={{ margin: "2px" }}>Legal Notice</Typography>
          <Typography sx={{ margin: "0 8px" }}>•</Typography>
          <Typography sx={{ margin: "2px" }}>Privacy Policy</Typography>
          <Typography sx={{ margin: "0 8px" }}>•</Typography>
          <Typography sx={{ margin: "2px" }}>Cookies Policy</Typography>
          <Typography sx={{ margin: "0 8px" }}>•</Typography>
          <Typography sx={{ margin: "2px" }}>Information Channel</Typography>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Footer;
