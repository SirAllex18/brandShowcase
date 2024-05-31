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
import InputSlider from "./Slider"; // Adjust the import path as necessary

const Trophies = ({ image, trophies, selectedYear, onYearChange }) => {
  const trophyLabels = [
    { key: 'ChampionsLeague', label: 'Champions League' },
    { key: 'EuropaLeague', label: 'Europa League' },
    { key: 'CampionatulRomaniei', label: 'Campionatul Romaniei' },
    { key: 'CupaRomaniei', label: 'Cupa Romaniei' },
    { key: 'Supercupe', label: 'Supercupe' },
    { key: 'ConferenceLeague', label: 'Conference League' },
    { key: 'MondialulCluburilor', label: 'Mondialul Cluburilor' },
  ];
  const maxTrophyValue = 25;
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
          alt="Team Image"
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
            {trophyLabels.map((trophy, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CardMedia
                    component="img"
                    image="/assets/trophy.jpg"
                    sx={{ width: '20%', height: 'auto' }}
                  />
                  <Typography sx={{ marginLeft: 2 }}>{trophies[trophy.key] || 0}</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="caption" sx={{ marginTop: 1 }}>{trophy.label}</Typography>
                  <Slider
                    size="small"
                    value={trophies[trophy.key] || 0}
                    aria-label={trophy.label}
                    valueLabelDisplay="auto"
                    sx={{ width: '100%', mt: '-12px' }}
                    min={0}
                    max={maxTrophyValue}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
          <InputSlider value={selectedYear} onChange={onYearChange} />
        </CardContent>
      </Box>
    </Card>
  );
};

export default Trophies;
