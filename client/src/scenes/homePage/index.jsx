import React from "react";
import { Container, Grid, Divider, Box, Typography } from "@mui/material";
import NavBar from "scenes/navBar";
import MainCard from "widgets/MainNews";
import NewsCard from "widgets/NewsCard";

const HomePage = () => {
  const partners = [
    { name: "Nike", image: "/assets/audi.png", url: "https://www.audi.com" },
    { name: "Spotify", image: "/assets/spotify.png", url: "https://open.spotify.com/" },
    { name: "HP", image: "/assets/hp.png", url: "https://www.hp.com" },
  ];

  return (
    <>
      <Box>
        <NavBar />
        <Container>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <MainCard
                title="Our 27th title, lets go blues!"
                image="/assets/NewsPicture.webp"
              />
            </Grid>
            <Grid container item xs={12} justifyContent="center" spacing={3} >
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewsCard
                  title="This is some example of text description of the title, must proceed with caution"
                  image="/assets/NewsPicture.webp"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewsCard
                  title="This is some example of text description of the title, must proceed with caution"
                  image="/assets/NewsPicture.webp"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewsCard
                  title="This is some example of text description of the title, must proceed with caution"
                  image="/assets/NewsPicture.webp"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewsCard
                  title="This is some example of text description of the title, must proceed with caution"
                  image="/assets/NewsPicture.webp"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewsCard
                  title="This is some example of text description of the title, must proceed with caution"
                  image="/assets/NewsPicture.webp"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewsCard
                  title="This is some example of text description of the title, must proceed with caution"
                  image="/assets/NewsPicture.webp"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <NewsCard
                  title="This is some example of text description of the title, must proceed with caution"
                  image="/assets/NewsPicture.webp"
                />
              </Grid>
            </Grid>
          </Grid>
        </Container>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ backgroundColor: "#2C2F33", p: 2, mt: 2 }}
        >
          <Typography sx={{ color: "white", mr: 2 }}>MAIN PARTNERS</Typography>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ backgroundColor: "white", height: "40px", mx: 2 }}
          />
          <Box display="flex" justifyContent="center" alignItems="center">
            {partners.map((partner, index) => (
                   <Box
                   key={index}
                   component="a"
                   href={partner.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   sx={{
                     mx: 2,
                     textDecoration: 'none',
                     display: 'flex',
                     justifyContent: 'center',
                     alignItems: 'center',
                   }}
                 >
                   <Box
                     component="img"
                     src={partner.image}
                     alt={partner.name}
                     sx={{
                       filter: "grayscale(100%)",
                       transition: "filter 0.3s",
                       "&:hover": {
                         filter: "grayscale(0%)",
                       },
                       height: "40px",
                     }}
                   />
                 </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
