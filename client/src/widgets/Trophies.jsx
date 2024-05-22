import React from "react";
import {
  Card,
  CardMedia,
  Typography,
  CardContent,
  Box,
  Slider
} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import InputSlider from "./Slider"

const Trophies = ({ image }) => {
  const trophies = [
    { count: 2, label: 'UEFA Cups' },
    { count: 2, label: 'UEFA Cups' },
    { count: 2, label: 'UEFA Cups' },
    { count: 2, label: 'UEFA Cups' },
    { count: 2, label: 'UEFA Cups' },
    { count: 2, label: 'UEFA Cups' },
    { count: 2, label: 'UEFA Cups' },
  ];

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: 2,
        borderRadius: "16px",
        width: "100%",
      }}
    >
      <Box sx={{ display: "flex", width: "100%" }}>
        <CardMedia
          component="img"
          image={image}
          alt="News Image"
          sx={{
            width: "60%",
            height: "auto",
            transition: "transform 0.3s ease-in-out",
            "&:hover": {
              transform: "scale(1.01)",
            },
          }}
        />
        <CardContent sx={{ width: "40%", display: 'flex', flexDirection: 'column' }}> 
          <Grid container spacing={2}>
            {trophies.map((trophy, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    image="/assets/trophy.jpg"
                    sx={{ width: '20%', height: 'auto' }}
                  />
                  <Typography sx={{ marginLeft: 2 }}>{trophy.count}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ marginTop: 1 }}>{trophy.label}</Typography>
                  <Slider
                    size="small"
                    defaultValue={10}
                    aria-label="Small"
                    valueLabelDisplay="auto"
                    sx={{ width: '100%', mt: '-12px' }} 
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          <InputSlider/>
        </CardContent>
      </Box>
    </Card>
  );
};

export default Trophies;
