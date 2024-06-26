import { Box, CardMedia, Container, Typography } from "@mui/material";
import Navbar from "../navBar";
import Footer from "scenes/footer";
import { useLocation } from "react-router-dom";

const Paragraphs = ({ text }) => {
  const paragraphs = text.split('\n\n');

  return (
    <Box sx={{ width: "70%", marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {paragraphs.map((paragraph, index) => (
        <Typography
          key={index}
          variant="h4"
          paragraph
          sx={{ textAlign: 'justify', width: '100%' }}
        >
          {paragraph}
        </Typography>
      ))}
    </Box>
  );
};

const NewsPage = () => {
 
  const location = useLocation();
  const { title, image, content } = location.state;
  
  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "6rem"}}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" textAlign="center" sx={{ marginTop: "2rem" }}>
            {title}
          </Typography>
          <CardMedia
            component="img"
            image={image}
            alt="News Image"
            sx={{
              marginTop: "1rem",
              width: "70%",
              transition: "transform 0.3s ease-in-out",
              borderRadius: 4,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              alignSelf: "flex-start",
              marginTop: '1rem',
              marginLeft: '11rem'
            }}
          >
            06/06/2024, 20:00
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Paragraphs text={content} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default NewsPage;
