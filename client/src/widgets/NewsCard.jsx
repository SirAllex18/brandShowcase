import React from 'react';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';

const NewsCard = ({ image, title }) => {
    return (
        <Card sx={{ maxWidth: 345, m:2 }}>
            <CardMedia
                component="img"
                height="140"
                image={image}
                alt="News Image"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default NewsCard;