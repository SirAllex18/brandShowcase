import Navbar from "./navBar";
import { Box, Typography, CardContent, CardActions, Button, Card } from "@mui/material";

const ProductPage = () => {
  return (
    <>
      <Navbar />
      <Box>
        <Box
          component="img"
          sx={{
            width: "200px",
            height: "200px",
            display: "block",
            margin: "auto",
          }}
          src={'asssets/item1.webp'}
          alt="hellopeople"
        />
        <Card variant='outlined'>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            Text
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>

        </Card>

      </Box>
    </>
  );
};

export default ProductPage;
