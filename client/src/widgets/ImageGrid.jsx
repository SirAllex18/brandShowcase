import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';

const itemData = [
  {
    img: 'assets/logo.jpg',
    title: 'La Liga Champions',
    buttonText: 'Shop now'
  },
  {
    img: 'assets/logo.jpg',
    title: 'Training',
    buttonText: 'Shop now'
  },
  {
    img: 'assets/logo.jpg',
    title: 'Road to London',
    buttonText: 'Shop now'
  },
  {
    img: 'assets/logo.jpg',
    title: 'Y-3 Travel',
    buttonText: 'Shop now'
  }
];

const ImageGrid = () => {
  return (
    <Container sx={{ marginTop: '4rem' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {itemData.filter((_, index) => index % 2 === 0).map((item, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                width: '350px',
                height: '400px',
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: 2,
                marginRight: '1rem',
                marginBottom: '1rem',
                borderRadius: 4
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '60%',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  textAlign: 'center',
                  padding: 1,
                  borderRadius: 3
                }}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Button variant="outlined" size="medium" sx={{ mt: 1, fontSize: '1.2rem' }}>
                  {item.buttonText}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: '50px' }}>
          {itemData.filter((_, index) => index % 2 !== 0).map((item, index) => (
            <Box
              key={index}
              sx={{
                position: 'relative',
                width: '350px',
                height: '400px',
                backgroundImage: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                padding: 2,
                marginBottom: '1rem',
                borderRadius: 4
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  bgcolor: 'rgba(0, 0, 0, 0.5)',
                  color: 'white',
                  textAlign: 'center',
                  padding: 1,
                  borderRadius: 3
                }}
              >
                <Typography variant="h6">{item.title}</Typography>
                <Button variant="outlined" size="medium" sx={{ mt: 1, color: 'red', fontSize: '1.2rem' }}>
                  {item.buttonText}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default ImageGrid;
