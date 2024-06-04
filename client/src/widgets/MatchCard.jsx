import React from "react";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";

const MatchCard = ({ homeTeam, awayTeam, score, competitionLogo, venue, date }) => {
  return (
    <Card sx={{ margin: 2, borderRadius: "16px", width: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#002F6C",
            color: "white",
            padding: "8px",
          }}
        >
          <Typography variant="h6">{date}</Typography>
        </Box>
        <Box sx={{ textAlign: "center", padding: "16px" }}>
          <img
            src={competitionLogo}
            alt="Competition Logo"
            style={{ width: "40px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginY: "8px",
            }}
          >
            <img
              src={homeTeam.logo}
              alt={homeTeam.name}
              style={{ width: "70px", marginRight: "2rem" }}
            />
            <Typography variant="h3">
              {score.home} - {score.away}{" "}
            </Typography>
            <img
              src={awayTeam.logo}
              alt={awayTeam.name}
              style={{ width: "70px", marginLeft: "2rem" }}
            />
          </Box>
          <Typography variant="h4" sx={{ marginTop: "1.2rem"}}>
            {homeTeam.name} vs {awayTeam.name}
          </Typography>
          <Typography variant="body2">{venue}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
