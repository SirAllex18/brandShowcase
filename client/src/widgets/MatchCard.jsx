import React from "react";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";

const MatchCard = ({ homeTeam, awayTeam, score, competitionLogo, venue, date, showScore, probability }) => {
  return (
    <Card sx={{ margin: 2, borderRadius: "16px", width: "100%" }}>
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#6CB4EE",
            color: "white",
            padding: "8px",
          }}
        >
          <Typography variant="h6">{date.split("T")[0]}</Typography>
        </Box>
        <Box sx={{ textAlign: "center", padding: "16px" }}>
          <img
            src={competitionLogo}
            alt="Competition Logo"
            style={{ width: "35px" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginY: "1.5rem",
            }}
          >
            <img
              src={homeTeam.logo}
              alt={homeTeam.name}
              style={{ width: "70px", marginRight: "2rem" }}
            />
            <Typography variant="h3">
              {showScore ? `${score.home} - ${score.away}` : date.split('T')[1].split(':00+')[0]}
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
          {probability !== null && 
          <Box>
              <Typography variant="h5"> Win probability: {probability} </Typography>
              <Typography variant="h6"> Provided by AI</Typography>
          </Box>
        }
        </Box>
      </CardContent>
    </Card>
  );
};

export default MatchCard;
