import React, { useState } from 'react';
import {
  Button,
  Collapse,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DropdownFilter = () => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    const value = event.target.name;
    setSelectedOptions((prev) =>
      prev.includes(value)
        ? prev.filter((option) => option !== value)
        : [...prev, value]
    );
    
  };

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleToggle}
        endIcon={<ExpandMoreIcon />}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          textTransform: 'none',
          backgroundColor: '#f0f4ff',
          color: '#0000ff',
          '&:hover': {
            backgroundColor: '#e0e4ff',
          },
        }}
      >
        <Typography variant="h6">Gender</Typography>
      </Button>
      <Collapse in={open}>
        <FormGroup sx={{ paddingLeft: 2 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.includes('Youth')}
                onChange={handleChange}
                name="Youth"
              />
            }
            label="Youth"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.includes('Unisex')}
                onChange={handleChange}
                name="Unisex"
              />
            }
            label="Unisex"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.includes('Female')}
                onChange={handleChange}
                name="Female"
              />
            }
            label="Female"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedOptions.includes('Male')}
                onChange={handleChange}
                name="Male"
              />
            }
            label="Male"
          />
        </FormGroup>
      </Collapse>
    </Box>
  );
};

export default DropdownFilter;
