import React from 'react';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';

const MainNews = ({ image, title }) => {
    return (
        <Card sx= {{ display: 'flex', margin: 2, borderRadius: '16px', width: '100%' }}>
            <CardMedia
                component="img"
                image= {image}
                alt= "Featured image"
                sx={{ width: '100%', height: 'auto' }}
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