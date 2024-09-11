import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Grid
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import { useEffect, useState } from "react";

const PlayerCard = ({ position }) => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const getPlayersByPosition = async (position) => {
      const response = await fetch(
        "https://brandshowcaseserver.vercel.app/playerByPosition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ position }),
        }
      );
      const data = await response.json();
      console.log(data);
      setPlayers(data);
    };
    getPlayersByPosition(position);
  }, []);

  return (
    <Box sx={{ flexGrow: 1, marginLeft: "1.7rem" }}>
      <Grid container spacing={5}>
        {players.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
              <CardMedia
                component="img"
                alt="player image"
                image="/assets/player.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {item.name}
                </Typography>
                <Typography variant="h3">
                  {item.kitNumber}
                </Typography>
                <FlexBetween marginTop="1rem">
                <Typography variant="h5">
                  Varsta {item.age}
                </Typography>
                <Typography variant="h5">
                    Pozitie: {item.position}
                  </Typography>
                </FlexBetween>
                <FlexBetween>
                  <Typography variant="h5" >
                    Meciuri jucate: {item.matchesPlayed}
                  </Typography>
                  <Typography variant="h5">
                    Goluri inscrise: {item.goalsScored}
                  </Typography>
                </FlexBetween>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PlayerCard;
