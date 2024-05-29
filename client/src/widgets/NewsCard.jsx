import React from 'react';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';     

const NewsCard = ({ image, title }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
      navigate('/news');
    };
    return (
        <Card sx={{ m:2, boxShadow: 'none', border: 0, borderRadius: '16px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', '&:hover' : { cursor: 'pointer' } }}   onClick={handleCardClick}>
            <CardMedia
                component="img"
                height="220"
                image={image}
                alt="News Image"
                sx={{
                    width: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)',
                        cursor: 'pointer'
                    }
                }}
            />
            <CardContent>
                <Typography variant="body2" color="text.primary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default NewsCard;