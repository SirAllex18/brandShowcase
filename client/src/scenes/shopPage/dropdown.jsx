import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,

} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({category}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (pageURL) => {
    handleClose();
    navigate(pageURL);
  };

  return (
    <Box>
      <Button
        ref={menuRef}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        {category}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { display: 'flex', flexDirection: 'row' },
        }}
        Paper={{
          sx: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            padding: '1rem',
          },
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ marginRight: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Mens
            </Typography>
            <MenuItem onClick={() => handleMenuItemClick('/')}>Tracksuits</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/')}>T-Shirts</MenuItem>
    
          </Box>
          <Box sx={{ marginRight: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Womens
            </Typography>
            <MenuItem onClick={() => handleMenuItemClick('/')}>Tracksuits</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/')}>T-Shirts</MenuItem>
          </Box>
          <Box sx={{ marginRight: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Youth
            </Typography>
            <MenuItem onClick={() => handleMenuItemClick('/')}>Tracksuits</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/')}>T-Shirts</MenuItem>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
