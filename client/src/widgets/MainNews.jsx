import React from 'react';
import { Card, CardMedia, Typography, CardContent } from '@mui/material';

const MainNews = ({ image, title }) => {
    return (
        <Card sx= {{ display: 'flex', margin: 2}}>
            <CardMedia
                component="img"
                sx={{ width: '100%', height: 'auto' }}
                image= {image}
                alt= "Featured image"
            />
            <CardContent>
                <Typography variant="h5">
                    { title }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MainNews;