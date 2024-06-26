import MatchCard from "widgets/MatchCard";
import Navbar from "scenes/navBar";
import { Box, Container, Typography } from "@mui/material";
import Footer from "scenes/footer";
import { useSelector } from "react-redux";

const MatchPage = () => {
  const matchInfo = useSelector((state) => state.match.matches);

  // Function to split the commentary text into two paragraphs
  const formatCommentary = (text) => {
    const sentences = text.split(/(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=\.|\?|!)\s/);
    const midpoint = Math.ceil(sentences.length / 2);

    const firstParagraph = sentences.slice(0, midpoint).join(' ');
    const secondParagraph = sentences.slice(midpoint).join(' ');

    return (
      <>
        <Typography
          variant="h4"
          paragraph
          sx={{
            textAlign: "justify",
            width: "100%",
            marginTop: "2rem",
            textIndent: "2em",
          }}
        >
          {firstParagraph}
        </Typography>
        <Typography
          variant="h4"
          paragraph
          sx={{
            textAlign: "justify",
            width: "100%",
            marginTop: "1rem",
          }}
        >
          {secondParagraph}
        </Typography>
      </>
    );
  };

  return (
    <>
      <Navbar />
      <Container sx={{ marginTop: "7rem"}}>
        <Box marginTop="3rem">
          <Typography variant="h3" marginBottom="1rem"> Raportul meciului. </Typography>
          <MatchCard {...matchInfo[0]} showScore={true} />
          <Box sx={{ marginTop: "2rem" }}>
            {formatCommentary(matchInfo[0].commentary)}
          </Box>
        </Box>
        <Box marginTop="5rem">
          <Typography variant="h3" marginBottom="1rem"> Urmatorul nostru meci: </Typography>
          <MatchCard {...matchInfo[1]} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default MatchPage;
