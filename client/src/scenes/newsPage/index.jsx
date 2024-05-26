import { Box, Button, CardMedia, Container, Typography } from "@mui/material";
import Navbar from "../navBar";
import Footer from "scenes/footer";

const Paragraphs = ({ text }) => {
  const paragraphs = text.split('\n\n');

  return (
    <Box sx={{ width: "70%", marginTop: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {paragraphs.map((paragraph, index) => (
        <Typography
          key={index}
          variant="body1"
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
  const text = `Real Madrid has a new date with destiny this evening in the final of the Euroleague 2024. Chus Mateo's team go in search of their twelfth European Cup at the Uber Arena in Berlin and will look to defend the title won a year ago in Kaunas to equal a feat not achieved since 1978, when the team coached by Ferrándiz was proclaimed champion two seasons in a row. The opponent will be Panathinaikos, the third most successful team with six titles, who are back in the final 13 years later.

  It will be an unprecedented Euroleague final in Berlin between Madrid and the Greeks. Two giants of European basketball with 17 European Cups between them but who have never faced each other in a title match. For Real Madrid, it will be their 21st final, and they have won 11 of them. It will be the seventh for Panathinaikos. With the exception of the Suproliga in 2001, they have won all six. They are the two great dominators of the millennium. The Greek team won the title in 2000, 2002, 2007, 2009, 2011 and we did so in 2015, 2018 and 2023.

  The two most in-form teams of the championship will be there. Madrid was unstoppable in the Regular Season, setting the record for victories with 27. They won the playoff convincingly against Baskonia (3-0) and the semifinals against Olympiacos after a spectacular performance (87-76). In total, 31 wins in 38 games. Their opponents have gone from strength to strength during the season and put together a great run of wins in the final stretch of the first phase to finish second with four wins fewer than the madridistas. They suffered against Maccabi, who took them to the fifth game in the quarterfinals, but in the semifinals they beat Fenerbahce comfortably (73-57).

  Breaking the curse
  There is little room for surprise between two teams that know each other very well. This season, we won at the OAKA Arena by 78-90 and they won at the WiZink Center by 86-97. Ataman's team has individuals capable of deciding a game like Nunn or Sloukas. Lessort is their great interior reference, where they will fight a great battle with Tavares, Poirier et al. Real Madrid is poised to become the first team to finish top of the Regular Season and win the Euroleague. Since the current format has been played, no team has ever done so. But this group is up for a challenge. As Chus Mateo said in the press conference before the final: "Our goal is to win two Euroleagues in a row, that's what motivates us and we're not going to stop. La Duodécima (title number 12) awaits us.`;

  return (
    <>
      <Navbar />
      <Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h2" sx={{ marginTop: "2rem" }}>
            Title
          </Typography>
          <CardMedia
            component="img"
            image="assets/NewsPicture.webp"
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
            Date example, hour updated
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Paragraphs text={text} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default NewsPage;
