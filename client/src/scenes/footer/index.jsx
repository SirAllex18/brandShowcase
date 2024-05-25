import React from "react";
import { Typography, Box, CardMedia, Container, TextField, Avatar } from "@mui/material";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Unstable_Grid2";
import  FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";


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
  "/assets/dubai.png"
]

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
    <Box sx={{display: 'flex', flexDirection: 'column', justifyContent:"center", alignItems: 'center', margin: '5rem' }}>
      <Divider flexItem sx={{ marginBottom: "3rem"}}/>
        <Typography sx={{marginBottom: "1.5rem"}}>
          Subscribe to our Newsletter for the latest news!
        </Typography>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Divider flexItem sx={{ marginTop: "3rem"}}/>
    </Box>
      <Container sx={{ marginTop: '100px'}}>
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
              <Box sx={{ display: "flex", justifyContent: "center", marginTop: '40px' }}>
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
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" >
            <FacebookTwoToneIcon sx={{ margin: '1rem'}}/>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <InstagramIcon sx={{ margin: '1rem'}} />
            </a>
            <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <XIcon sx={{ margin: '1rem'}} />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <YouTubeIcon sx={{ margin: '1rem'}} />
            </a>
        </FlexBetween>
 
      </FlexBetween>
      <Divider flexItem sx={{ margin: "5px"}}/>
      <FlexBetween>
        <Typography>
            Soverign Blues All rights reserved
        </Typography>
        <FlexBetween>
            <Typography sx={{ margin: '2px'}}>
                Legal Notice
            </Typography>
            <Typography sx={{ margin: '0 8px' }}>•</Typography>
            <Typography sx={{ margin: '2px'}}>
                Privacy Policy    
            </Typography>
            <Typography sx={{ margin: '0 8px' }}>•</Typography>
            <Typography sx={{ margin: '2px'}}>
                Cookies Policy    
            </Typography>
            <Typography sx={{ margin: '0 8px' }}>•</Typography>
            <Typography sx={{ margin: '2px'}}>
                Information Channel    
            </Typography>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Footer;
