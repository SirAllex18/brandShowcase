import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

const MatchCard = ({ homeTeam, awayTeam, score, competitionLogo, venue, date, showScore, probability }) => {
  function extractTime(datetimeString) {
    const date = new Date(datetimeString);
    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
  const time = extractTime(date);

  return (
    <Card sx={{ borderRadius: "16px", width: "100%" }}>
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
          <Box display="flex" justifyContent="left">
            <img
              src={competitionLogo}
              alt="Competition Logo"
              style={{ width: "35px" }}
            />
          </Box>
      
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginY: "1.5rem",
              flexDirection: { xs: 'row', sm: 'row' },
              flexWrap: 'nowrap'
            }}
          >
            <img
              src={homeTeam.logo}
              alt={homeTeam.name}
              style={{ width: "70px", marginRight: "2rem" }}
            />
           
            <Typography variant="h3" sx={{ whiteSpace: 'nowrap' }}>
              {showScore ? `${score.home} - ${score.away}` : time}
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
