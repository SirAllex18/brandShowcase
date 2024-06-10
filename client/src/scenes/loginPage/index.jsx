import { Box, Typography, useMediaQuery, Avatar } from "@mui/material";
import Form from "./Form";
import Footer from "./footer";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <>
      <Box
        height="90vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        backgroundColor="white"
      >
        <Avatar
          src={`${process.env.PUBLIC_URL}/assets/logo.jpg`}
          alt="Club's Logo"
          sx={{ width: 100, height: 100, mb: 2 }}
        />
        <Box
          width={isNonMobileScreens ? "20%" : "93%"}
          p="2rem"
          borderRadius="1.5rem"
          textAlign="center"
        >
          <Typography fontWeight="bold" variant="h1" sx={{ mb: "1.5rem" }}>
            Bun venit!
          </Typography>
          <Typography variant="h5" sx={{ mb: "1.5rem" }}>
            Loghează-te sau creazăți un cont nou:
          </Typography>
          <Form />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
