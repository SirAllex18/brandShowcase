import React from 'react';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MainNews = ({ image, title }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate('/news');
    };
    return (
        <Card sx= {{ display: 'flex', margin: 2, borderRadius: '16px', width: '100%' }}  onClick={handleCardClick}>
          <CardMedia
                component="img"
                height="220"
                image={image}
                alt="News Image"
                sx={{
                    width: '100%',
                    height: 'auto',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.02)'
                    }
                }}
            />
            <CardContent sx={{ display: 'flex', alignItems: 'center',  bgcolor: '#f5f5f5', width: '20rem' }}>
                <Typography variant="h5">
                    { title }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MainNews;