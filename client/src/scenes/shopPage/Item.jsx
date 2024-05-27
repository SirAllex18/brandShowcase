import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Divider, Button } from "@mui/material";

const items = [
  {
    title: "Example of Title T-shirt etc",
    image: "/assets/item1.webp",
    price: "40$",
  },
  {
    title: "Example of Title T-shirt etc",
    image: "/assets/item1.webp",
    price: "40$",
  },
  {
    title: "Example of Title T-shirt etc",
    image: "/assets/item1.webp",
    price: "40$",
  },
  {
    title: "Example of Title T-shirt etc",
    image: "/assets/item1.webp",
    price: "40$",
  },
];
const Item = () => {
  return (
    <>
    <Typography variant='h3' textAlign={'center'} sx={{marginTop: '2rem', marginBottom: '2rem'}}>
        Trending now
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" sx={{ borderRadius: 5 }}>Category1</Button>
        <Button variant="outlined" sx={{ mx: '1rem', borderRadius: 5 }}>Category2</Button>
        <Button variant="outlined" sx={{ borderRadius: 5 }}>Category3</Button>
    </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        {items.map((item, index) => (
          <Box keyx={index}>
            <Card sx={{ maxWidth: 345, mx: '1rem', borderRadius: 4, boxShadow: '1px 4px 8px rgba(0, 0, 0, 0.2)' }}>
              <CardMedia
                component="img"
                image={item.image}
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {item.title}
                </Typography>
              </CardContent>
              <Divider variant="middle" />
              <Typography variant="h6" marginLeft="2rem" my="0.5rem">
                {item.price}
              </Typography>
            </Card>
          </Box>
        ))}
      </Box>
    </>
  );
};

export default Item;
