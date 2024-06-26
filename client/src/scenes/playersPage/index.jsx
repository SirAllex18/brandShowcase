import { Box, Button, Container, Typography } from "@mui/material";
import Navbar from "../navBar";
import PlayerCard from "widgets/PlayerDetails";
import Footer from "scenes/footer";
import { useRef } from "react";

const PlayersPage = () => {
  const goalkeepersRef = useRef(null);
  const defendersRef = useRef(null);
  const midfieldersRef = useRef(null);
  const strikersRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          width: "100%",
          height: "200px",
          backgroundImage: "url(/assets/bgHeader.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Container sx={{ marginTop: "5rem" }}>
          <Typography variant="h1" color="textPrimary">
            Prima Echipa
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="xl">
        <Box >
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
          >
            <Button variant="contained" onClick={() => scrollToSection(goalkeepersRef)}>Portari</Button>
            <Button variant="contained" sx={{ mx: "1.5rem" }} onClick={() => scrollToSection(defendersRef)}>Fundasi</Button>
            <Button variant="contained" onClick={() => scrollToSection(midfieldersRef)}>Mijlocasi</Button>
            <Button variant="contained" sx={{ mx: "1.5rem" }} onClick={() => scrollToSection(strikersRef)}>Atacanti</Button>
          </Box>
          <Typography variant="h2" align="center" marginTop="2rem" marginBottom="1rem" ref={goalkeepersRef}>
            Portari
          </Typography>
          <PlayerCard position={"Portar"} />
          <Typography variant="h2" align="center" marginTop="2rem" marginBottom="1rem" ref={defendersRef}>
            Fundasi
          </Typography>
          <PlayerCard position={"Fundas"} />
          <Typography variant="h2" align="center" marginTop="2rem" marginBottom="1rem" ref={midfieldersRef}>
            Mijlocasi
          </Typography>
          <PlayerCard position={"Mijlocas"} />
          <Typography variant="h2" align="center" marginTop="2rem" marginBottom="1rem"  ref={strikersRef}>
            Atacanti
          </Typography>
          <PlayerCard position={"Atacant"} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default PlayersPage;
