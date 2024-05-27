import { Box, Button, Container, Typography } from "@mui/material";
import Navbar from "../navBar";
import PlayerCard from "widgets/PlayerDetails";
import Footer from "scenes/footer";

const PlayersPage = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "200px", // Adjust the height as needed
          backgroundImage: "url(/assets/bgHeader.png)", // Update the path to your image
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          borderTop: 1,
          borderBottom: 1,
          borderColor: "red",
        }}
      >
        <Container>
          <Typography variant="h4" color="textPrimary">
            First Team
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box sx={{ border: 2, borderRadius: 2, mt: "2rem" }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
          >
            <Button variant="contained">Portari</Button>
            <Button variant="contained" sx={{ mx: "1.5rem" }}>
              Fundasi
            </Button>
            <Button variant="contained">Mijlocasi</Button>
            <Button variant="contained" sx={{ mx: "1.5rem" }}>
              Atacanti
            </Button>
            <Button variant="contained">Antrenor</Button>
          </Box>
          <Typography variant="body1" align="center">
            Portari
          </Typography>
          <Box sx={{ display: "flex" }}>
            <PlayerCard />
          </Box>
          <Typography variant="body1" align="center">
            Fundasi
          </Typography>
          <Box sx={{ display: "flex" }}>
            <PlayerCard />
          </Box>
          <Typography variant="body1" align="center">
            Mijlocasi
          </Typography>
          <Box sx={{ display: "flex" }}>
            <PlayerCard />
          </Box>
          <Typography variant="body1" align="center">
            Atacanti
          </Typography>
          <Box sx={{ display: "flex" }}>
            <PlayerCard />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PlayersPage;
