import React from 'react';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';

const NewsCard = ({ image, title }) => {
    return (
        <Card sx={{ m:2, boxShadow: 'none', border: 0, borderRadius: '16px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="220"
                image={image}
                alt="News Image"
                sx={{
                    width: '100%',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.1)'
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