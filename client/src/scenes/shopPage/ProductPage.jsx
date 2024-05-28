import Navbar from "./navBar";
import {
  Box,
  Typography,
  CardContent,
  CardActions,
  Button,
  Card,
} from "@mui/material";
import AccordionProduct from "widgets/Accordion";

const ProductPage = () => {
  return (
    <>
      <Navbar />

      <Box
        sx={{ display: "flex", justifyContent: "space-around", height: "100%" }}
      >
        <Box
          component="img"
          sx={{
            width: "50rem",
            height: "65 rem",
          }}
          src={`${process.env.PUBLIC_URL}/assets/item2.webp`}
          alt="hellopeople"
        />
        <Box sx={{ marginTop: "2rem", width: "40%", height: "250px" }}>
          <Card variant="outlined" sx={{ borderRadius: 5 }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                Home - CategoryName
              </Typography>
              <Typography
                variant="h5"
                component="div"
                sx={{ marginTop: "1rem" }}
              >
                Product Name T-shirt etc
              </Typography>
              <Typography variant="body1" sx={{ marginTop: "0.4rem" }}>
                45$
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: "bold", marginTop: "2rem" }}
              >
                Size:
              </Typography>
              <Box sx={{ marginTop: "0.75rem" }}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 5,
                    fontSize: "0.75rem",
                    padding: "2px 6px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }}
                >
                  S
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 5,
                    fontSize: "0.75rem",
                    padding: "2px 6px",
                    minWidth: "30px",
                    minHeight: "30px",
                    marginLeft: "0.4rem",
                  }}
                >
                  M
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 5,
                    fontSize: "0.75rem",
                    padding: "2px 6px",
                    minWidth: "30px",
                    minHeight: "30px",
                    mx: "0.4rem",
                  }}
                >
                  L
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 5,
                    fontSize: "0.75rem",
                    padding: "2px 6px",
                    minWidth: "30px",
                    minHeight: "30px",
                  }}
                >
                  XL
                </Button>
              </Box>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: 4,
                  marginBottom: "1rem",
                  mx: "1rem",
                  padding: "0.70rem",
                }}
              >
                Add to cart
              </Button>
            </CardActions>
          </Card>
          <Box sx={{ marginTop: '1rem'}}>
            <AccordionProduct />
          </Box>
        
        </Box>
      </Box>
    </>
  );
};

export default ProductPage;
