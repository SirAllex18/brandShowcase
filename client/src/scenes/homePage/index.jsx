import React, { useState, useEffect } from "react";
import { Container, Grid, Divider, Box, Typography } from "@mui/material";
import NavBar from "scenes/navBar";
import MainCard from "widgets/MainNews";
import NewsCard from "widgets/NewsCard";
import MatchCard from "widgets/MatchCard";
import PlayersSlider from "widgets/Players";
import Trophies from "widgets/Trophies";
import Footer from "scenes/footer";
import NewsDialogue from "widgets/NewsDialogue";

const HomePage = () => {
  const partners = [
    { name: "Nike", image: "/assets/audi.png", url: "https://www.audi.com" },
    {
      name: "Spotify",
      image: "/assets/spotify.png",
      url: "https://open.spotify.com/",
    },
    { name: "HP", image: "/assets/hp.png", url: "https://www.hp.com" },
  ];

  const matches = [
    {
      date: "13",
      day: "MONDAY",
      month: "MAY",
      league: "LALIGA",
      time: "90+7",
      homeTeam: { name: "FC Barcelona", logo: "/path_to_barcelona_logo.png" },
      awayTeam: { name: "Real Sociedad", logo: "/path_to_sociedad_logo.png" },
      venue: "Estadi Olímpic Lluís Companys",
      result: "2 - 0",
      buttons: [{ text: "FULL MATCH REPORT" }],
    },
    {
      date: "16",
      day: "THURSDAY",
      month: "MAY",
      league: "LALIGA",
      time: "21:30",
      homeTeam: { name: "Almería", logo: "/path_to_almeria_logo.png" },
      awayTeam: { name: "FC Barcelona", logo: "/path_to_barcelona_logo.png" },
      venue: "Power Horse Stadium",
      result: "21:30",
      buttons: [],
    },
    {
      date: "19",
      day: "SUNDAY",
      month: "MAY",
      league: "LALIGA",
      time: "19:00",
      homeTeam: { name: "FC Barcelona", logo: "/path_to_barcelona_logo.png" },
      awayTeam: { name: "Rayo", logo: "/path_to_rayo_logo.png" },
      venue: "Estadi Olímpic Lluís Companys",
      result: "19:00",
      buttons: [{ text: "TICKETS" }, { text: "MATCH DAY TOUR" }],
    },
  ];

  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/files/getAllNews");
        const data = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error("Failed to fetch news items:", error);
      }
    };

    fetchNewsItems();
  }, []);

  const addNewsItem = (newItem) => {
    setNewsItems((prevItems) => [newItem, ...prevItems]);
  };

  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(1990);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/trophies/getTrophies'); // Adjust the URL as needed
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging line
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  if (!data) {
    return <Typography>Loading...</Typography>;
  }
  const selectedYearData = data[0].records ? data[0].records.find(record => record.year === selectedYear) || {} : {};

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
            <Grid container item xs={12} justifyContent="center" spacing={3}>
              {newsItems.map((newsItem) => (
                <Grid item key={newsItem._id} xs={12} sm={6} md={4} lg={3}>
                  <NewsCard
                    id={newsItem._id}
                    title={newsItem.title}
                    image={newsItem.imagePath || "/assets/NewsPicture.webp"}
                    content={newsItem.content}
                    preview={newsItem.preview}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <NewsDialogue addNewsItem={addNewsItem} />
          </Box>
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
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
        <Container>
          <Grid container spacing={2} justifyContent="center">
            {matches.map((match, index) => (
              <Grid item xs={12} sm={6} md={index === 1 ? 6 : 3} key={index}>
                <MatchCard {...match} />
              </Grid>
            ))}
          </Grid>
        </Container>
        <Box
          sx={{
            height: "100px",
            backgroundColor: "#e1e5ea",
            marginTop: "4rem",
          }}
        />
        <Container sx={{ mt: 10 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              marginLeft: "1.2rem",
            }}
          >
            <Typography variant="h4">Our Players</Typography>
          </Box>
          <PlayersSlider />
        </Container>
        <Box sx={{ height: "100px", backgroundColor: "#e1e5ea", my: "4rem" }} />
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ marginLeft: "1.2rem" }}>
              A legendary track record
            </Typography>
          </Box>
          <Box>
            <Trophies
              image="/assets/NewsPicture.webp"
              trophies={selectedYearData.trophies || {}}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
            />
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default HomePage;
