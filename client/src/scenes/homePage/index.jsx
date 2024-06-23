import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Divider,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { setMatches } from "../../state/matchSlice.js";
import NavBar from "scenes/navBar";
import MainCard from "widgets/MainNews";
import NewsCard from "widgets/NewsCard";
import MatchCard from "widgets/MatchCard";
import PlayersSlider from "widgets/Players";
import Trophies from "widgets/Trophies";
import Footer from "scenes/footer";
import NewsDialogue from "widgets/NewsDialogue";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const partners = [
    { name: "Nike", image: "/assets/audi.png", url: "https://www.audi.com" },
    {
      name: "Spotify",
      image: "/assets/spotify.png",
      url: "https://open.spotify.com/",
    },
    { name: "HP", image: "/assets/hp.png", url: "https://www.hp.com" },
  ];
 
  const [matchInfo, setMatchInfo] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [data, setTrophies] = useState(null);
  const [selectedYear, setSelectedYear] = useState(1990);
  const user = useSelector((state) => state.auth.user);
  
  const addNewsItem = (newItem) => {
    setNewsItems((prevItems) => [newItem, ...prevItems]);
  };
  const navigate = useNavigate();
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    const fetchInitialMatches = async () => {
      try {
        const response = await fetch("http://localhost:3001/games/getMatchDay");
        const initialData = await response.json();
        setMatchInfo(initialData);
        dispatch(setMatches(initialData));
      } catch (error) {
        console.error("Failed to fetch initial matches:", error);
      }
    };

    fetchInitialMatches();
  }, []);

  useEffect(() => {
    const getNewsItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/files/getAllNews");
        const data = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error("Failed to fetch news items:", error);
      }
    };

    getNewsItems();
  }, []);

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

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

  const selectedYearData = data[0]?.records
    ? data[0].records.find((record) => record.year === selectedYear) || {}
    : {};
  console.log(matchInfo);
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
          {user?.role === "admin" && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <NewsDialogue addNewsItem={addNewsItem} />
            </Box>
          )}
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
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="center">
            {
              matchInfo.map((match, index) => (
                <Grid item xs={12} sm={6} md={index === 1 ? 6 : 3} key={index}>
                  <MatchCard {...match} showScore={index === 0} />
                </Grid>
              ))
          }
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
              image="/assets/sliderPhoto.jpg"
              trophies={selectedYearData.trophies || {}}
              selectedYear={selectedYear}
              onYearChange={handleYearChange}
            />
            <Box display="flex" justifyContent="center" marginTop="2rem">
              <Button variant="outlined" onClick={() => navigate("/history")}>
                {" "}
                Descopera{" "}
              </Button>
            </Box>
          </Box>
        </Container>
        <Footer />
      </Box>
    </>
  );
};

export default HomePage;
