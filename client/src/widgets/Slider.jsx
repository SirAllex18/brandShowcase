import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

function InputSlider({ value, onChange }) {
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  const handleInputChange = (event) => {
    onChange(event.target.value === '' ? 0 : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 1990) {
      onChange(1990);
    } else if (value > 2024) {
      onChange(2024);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      <Typography id="input-slider" gutterBottom>
        Year
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={1990}
            max={2024}
          />
        </Grid>
        <Grid item>
          <Input
            value={value}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: 1990,
              max: 2024,
              type: 'number',
              'aria-labelledby': 'input-slider',
              
            }}
            sx={{ width: '3.5rem'}}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default InputSlider;
