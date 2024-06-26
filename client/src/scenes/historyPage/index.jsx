import Navbar from "scenes/navBar";
import { Container, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import Footer from "scenes/footer";

const HistoryPage = () => {
  const [data, setTrophies] = useState([]);
  const [totalTrophies, setTotalTrophies] = useState();
  const [championsLeague, setChampionsLeague] = useState([]);
  const [europaLeague, setEuropaLeague] = useState([]);
  const [campionatulRomaniei, setCampionat] = useState([]);
  const [supercupe, setSupercupe] = useState([]);
  const [conference, setConference] = useState([]);
  const [cupeData, setCupe] = useState([]);
  const [mondialulCluburilor, setMondiale] = useState([]);

  useEffect(() => {
    const getTrophies = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/trophies/getTrophies"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTrophies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getTrophies();
  }, []);

  useEffect(() => {
    const fetchTrophies = async () => {
      const championsLeagueData = await getTrophiesByCompetition(
        "2024",
        "ChampionsLeague"
      );
      setChampionsLeague(championsLeagueData);

      const europaLeagueData = await getTrophiesByCompetition(
        "2024",
        "EuropaLeague"
      );
      setEuropaLeague(europaLeagueData);

      const CampionatData = await getTrophiesByCompetition(
        "2024",
        "CampionatulRomaniei"
      );
      setCampionat(CampionatData);

      const supercupeData = await getTrophiesByCompetition("2024", "Supercupe");
      setSupercupe(supercupeData);

      const conferenceData = await getTrophiesByCompetition(
        "2024",
        "ConferenceLeague"
      );
      setConference(conferenceData);

      const CupeData = await getTrophiesByCompetition("2024", "CupaRomaniei");
      setCupe(CupeData);

      const MondialulData = await getTrophiesByCompetition(
        "2024",
        "MondialulCluburilor"
      );
      setMondiale(MondialulData);
    };

    fetchTrophies();
  }, []);

  const getTrophiesByCompetition = async (year, competition) => {
    try {
      const response = await fetch(
        "http://localhost:3001/trophies/getTrophiesCompetition",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            year: year,
            competition: competition,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Hello", data);
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (data.length > 0) {
      setTotalTrophies(calculateTotalTrophies());
    }
  }, [data]);

  const calculateTotalTrophies = () => {
    const trophyObject = data[0].records.slice(
      data[0].records.length - 1,
      data[0].records.length
    );
    const Items = trophyObject[0].trophies;

    let sumOfTrophies = 0;
    for (let key in Items) {
      if (key !== "_id") {
        sumOfTrophies += Items[key];
      }
    }
    return sumOfTrophies;
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "10%",
          display: "flex",
          justifyContent: "left",
          alignItems: "end",
          marginTop: { xs: "4rem", md: "2rem", lg: "2rem"},
        }}
      >
        <Container maxWidth="xl">
          <Box>
            <Typography variant="h1">Un pas pe drumul istorie...</Typography>
          </Box>
        </Container>
      </Box>
      <Container>
        <Box marginTop="5rem">
          <Typography variant="h4" textAlign="left">
            FC Sovereign Blues este unul dintre cele mai de{" "}
          </Typography>
          <Typography variant="h4" textAlign="left">
            succes cluburi de fotbal din lume, castigand un total de{" "}
            {totalTrophies} trofee.{" "}
          </Typography>
        </Box>
      </Container>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
          backgroundColor: "#6CB4EE",
          height: "40%",
        }}
      >
        <Box
          component="img"
          src="/assets/internalTrophy.webp"
          alt="alternative text"
          sx={{
            width: { xs: "250px", sm: "350px", md: "500px" },
            height: "auto",
            objectFit: "fill",
          }}
        />
        <Box sx={{  width: { xs: "60%", sm: "30%", md: "20%" } }}>
          <Typography
            variant="h3"
            marginLeft="3rem"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {" "}
            Campionatul intern - {campionatulRomaniei.trophies}
          </Typography>
          <Typography variant="h5" marginLeft="2rem" textAlign="center">
            {" "}
            Suntem cea mai titrata echipa pe plan intern cu un numar record de
            campionate castigate.{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <Box sx={{  width: { xs: "60%", sm: "30%", md: "20%" } }}>
          <Typography
            variant="h3"
            marginRight="4rem"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {" "}
            Champions League - {championsLeague.trophies}
          </Typography>
          <Typography variant="h5" marginRight="2rem" textAlign="center">
            {" "}
            Am castigat cu mandrie de {championsLeague.trophies} ori cea mai
            ravnita competitie din lume!
          </Typography>
        </Box>
        <Box
          component="img"
          src="/assets/elPresidente.webp"
          alt="alternative text"
          sx={{
            width: { xs: "250px", sm: "350px", md: "500px" },
            height: "auto",
            objectFit: "fill",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
          backgroundColor: "#6CB4EE",
          height: "40%",
        }}
      >
        <Box
          component="img"
          src="/assets/footballPitch.webp"
          alt="alternative text"
          sx={{
            width: { xs: "250px", sm: "350px", md: "500px" },
            height: "auto",
            objectFit: "fill",
          }}
        />
        <Box sx={{ width: { xs: "60%", sm: "30%", md: "20%" } }}>
          <Typography
            variant="h3"
            marginLeft="2rem"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {" "}
            Cupa - {cupeData.trophies}
          </Typography>
          <Typography variant="h5" marginLeft="2rem" textAlign="center">
            {" "}
            Un turneu magic, ce ofera tuturor echipelor o sansa la trofeu, prima
            victorie a noastra fiind adusa de legendarul Bobby Charlton!{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <Box sx={{  width: { xs: "60%", sm: "30%", md: "20%" } }}>
          <Typography
            variant="h3"
            marginRight="2rem"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {" "}
            Supercupe - {supercupe.trophies}
          </Typography>
          <Typography variant="h5" marginRight="2rem" textAlign="center">
            {" "}
            Supercupa aduce fata in fata cele mai bune echipa dintr-un sezon
            competitional, cu mandrie am iesit castigatori de{" "}
            {supercupe.trophies}
          </Typography>
        </Box>
        <Box
          component="img"
          src="/assets/supercupe.webp"
          alt="alternative text"
          sx={{
            width: { xs: "250px", sm: "350px", md: "500px" },
            height: "auto",
            objectFit: "fill",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
          backgroundColor: "#6CB4EE",
          height: "40%",
        }}
      >
        <Box
          component="img"
          src="/assets/conference.webp"
          alt="alternative text"
          sx={{
            width: { xs: "250px", sm: "350px", md: "500px" },
            height: "auto",
            objectFit: "fill",
          }}
        />
        <Box sx={{ width: { xs: "60%", sm: "30%", md: "20%" } }}>
          <Typography
            variant="h3"
            marginLeft="4rem"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {" "}
            Conference League - {conference.trophies}
          </Typography>
          <Typography variant="h5" marginLeft="2rem" textAlign="center">
            {" "}
            Cea mai noua competitie internationala creata de UEFA ne-a oferit
            sansa sa castigam si aceasta competitie de {conference.trophies}{" "}
            ori!{" "}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
        }}
      >
        <Box sx={{  width: { xs: "60%", sm: "30%", md: "20%" } }}>
          <Typography
            variant="h3"
            marginRight="2rem"
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {" "}
            Europa League - {europaLeague.trophies}
          </Typography>
          <Typography variant="h5" marginRight="2rem" textAlign="center">
            {" "}
            A doua cea mai importanta competitie europeana, ne-a adus prima
            victorie in anul 1996 cu o victorie impotriva scotienilor de la
            Celtic! Urmate de inca 13 trofee ce le avem expuse cu mandrie in
            muzeul nostru.
          </Typography>
        </Box>
        <Box
          component="img"
          src="/assets/NewsPicture.webp"
          alt="alternative text"
          sx={{
            width: { xs: "250px", sm: "350px", md: "500px" },
            height: "auto",
            objectFit: "fill",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10rem",
          backgroundColor: "#6CB4EE",
          height: "40%",
        }}
      >
        <Box
          component="img"
          src="/assets/fans.webp"
          alt="alternative text"
          sx={{
            width: { xs: "250px", sm: "350px", md: "500px" },
            height: "auto",
            objectFit: "fill",
          }}
        />
        <Box sx={{ width: { xs: "60%", sm: "30%", md: "20%" }}}>
          <Typography
            variant="h3"
            marginLeft="4rem"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            {" "}
            Mondialul cluburilor - {mondialulCluburilor.trophies}
          </Typography>
          <Typography variant="h5" marginLeft="2rem" textAlign="center">
            {" "}
            Si nu cea din urma, Mondialul Cluburilor este o competitie aduna
            cele mai bune echipe din toata lumea si ofera fanilor sansa de a isi
            vedea echipa favorita impotriva lumii intregi!{" "}
          </Typography>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default HistoryPage;
