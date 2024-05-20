import React from 'react';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';

const MatchCard = ({ date, day, month, league, time, homeTeam, awayTeam, venue, result, buttons }) => {
  return (
    <Card sx={{ margin: 2, borderRadius: '16px', width: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#002F6C', color: 'white', padding: '8px' }}>
          <Typography variant="h6">{date}</Typography>
          <Box>
            <Typography variant="body2">{day}</Typography>
            <Typography variant="body2">{month}</Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: 'center', padding: '16px' }}>
          <Typography variant="h6">{league}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginY: '8px' }}>
            <img src={homeTeam.logo} alt={homeTeam.name} style={{ width: '30px', marginRight: '8px' }} />
            <Typography variant="h4">{result}</Typography>
            <img src={awayTeam.logo} alt={awayTeam.name} style={{ width: '30px', marginLeft: '8px' }} />
          </Box>
          <Typography variant="body1">{homeTeam.name} v {awayTeam.name}</Typography>
          <Typography variant="body2">{venue}</Typography>
        </Box>
        {buttons && (
          <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: '8px' }}>
            {buttons.map((button, index) => (
              <Button key={index} variant="contained" color="primary">{button.text}</Button>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default MatchCard;