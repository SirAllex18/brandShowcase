import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Divider,
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
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
import NewsUpdateDialogue from "widgets/NewsUpdateDialogue.jsx";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";

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
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));


   const addNewsItem = (newItem) => {
    setNewsItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item._id === newItem._id);
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex] = newItem;
        return updatedItems;
      } else {
        return [newItem, ...prevItems];
      }
    });
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleDeleteNews = async (id) => {
    const deleteNews = await fetch("https://brandshowcaseserver.vercel.app/files/deleteNews", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id: id }),
    });
    
    if (deleteNews.ok) {
      setNewsItems(prevItems => prevItems.map(item => 
        item._id === id ? { ...item, showFlag: false } : item
      ));
    }
  };

  useEffect(() => {
    const fetchInitialMatches = async () => {
      try {
        const response = await fetch("https://brandshowcaseserver.vercel.app/games/getMatchDay");
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
        const response = await fetch("https://brandshowcaseserver.vercel.app/files/getAllNews");
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
          "https://brandshowcaseserver.vercel.app/trophies/getTrophies"
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
  return (
    <>
      <Box>
        <NavBar />
        <Container>
          <Grid container justifyContent="center" marginTop="7rem">
            <Grid item xs={12}>
              <MainCard
                title="Titlul nostru cu numarul 27!"
                image="/assets/NewsPicture.webp"
              />
            </Grid>
            <Grid container item xs={12} justifyContent="center" spacing={3}>
              {newsItems
                .filter((newsItem) => newsItem.showFlag)
                .map((newsItem) => (
                  <Grid item key={newsItem._id} xs={12} sm={6} md={4} lg={3}>
                    {user?.role === "admin" && (
                       <Box display="flex" justifyContent="center" alignItems="center">
                       <Button>
                       <DeleteSweepIcon
                         sx= {{ "&:hover": {cursor: "pointer" }}}
                         onClick={() => handleDeleteNews(newsItem._id)}
                       />
                       </Button>
                       <NewsUpdateDialogue {...newsItem} addNewsItem={addNewsItem}/>
                     </Box>
                    )}
                    <NewsCard
                      id={newsItem._id}
                      title={newsItem.title}
                      image={newsItem.imageUrl || "/assets/NewsPicture.webp"}
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
        {!isMobile && (
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
        )}
        <Container maxWidth="xl">
          <Grid container spacing={2} justifyContent="center" marginY="3rem">
            {matchInfo.map((match, index) => (
              <Grid item xs={12} sm={6} md={index === 1 ? 6 : 3} key={index}>
                <MatchCard {...match} showScore={index === 0} />
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
            <Typography variant="h3">Jucatorii echipei</Typography>
          </Box>
          <PlayersSlider />
        </Container>
        <Box sx={{ height: "100px", backgroundColor: "#e1e5ea", marginY: "4rem" }} />
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ marginLeft: "1.2rem" }}>
              Un parcurs legendar
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
