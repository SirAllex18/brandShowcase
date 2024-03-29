import { Box, Typography, useMediaQuery, Avatar } from "@mui/material";
import Form from "./Form";

const LoginPage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      <Box
        width="100%"
        backgroundColor= "white"
        p="1rem 6%"
        display= "flex"
        justifyContent= "center"
      >
        <Avatar src={`${process.env.PUBLIC_URL}/assets/logo.jpg`} alt="Club's Logo" 
            sx={{ width: 100, height: 100 }}
        />
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="auto"
        borderRadius="1.5rem"
        textAlign= "center"
      >
        <Typography fontWeight="bold" variant="h4" sx={{ mb: "1.5rem" }}>
          Bun venit!
        </Typography>
        <Typography variant="h6" sx={{ mb: "1.5rem" }}>
          Loghează-te sau creazăți un cont nou: 
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;