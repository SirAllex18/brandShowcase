import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,

} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router

const DropdownMenu = () => {
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
    navigate(pageURL); // Navigate to the specific page
  };

  return (
    <Box>
      <Button
        ref={menuRef}
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        Fashion
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          sx: { display: 'flex', flexDirection: 'row' }, // Make the menu items appear in a row
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
            <MenuItem onClick={() => handleMenuItemClick('/mens/tracksuits')}>Tracksuits</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/mens/tshirts')}>T-Shirts</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/mens/sweatshirts')}>Sweatshirts</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/mens/jackets')}>Jackets</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/mens/pants')}>Pants</MenuItem>
          </Box>
          <Box sx={{ marginRight: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Womens
            </Typography>
            <MenuItem onClick={() => handleMenuItemClick('/womens/tracksuits')}>Tracksuits</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/womens/tshirts')}>T-Shirts</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/womens/sweatshirts')}>Sweatshirts</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/womens/jackets')}>Jackets</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/womens/pants')}>Pants</MenuItem>
          </Box>
          <Box sx={{ marginRight: '2rem' }}>
            <Typography variant="h6" gutterBottom>
              Youth
            </Typography>
            <MenuItem onClick={() => handleMenuItemClick('/youth/tracksuits')}>Tracksuits</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/youth/tshirts')}>T-Shirts</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/youth/sweatshirts')}>Sweatshirts</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/youth/jackets')}>Jackets</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/youth/pants')}>Pants</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/youth/baby-clothing')}>Baby Clothing</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/youth/pajamas')}>Pajamas</MenuItem>
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              Collections
            </Typography>
            <MenuItem onClick={() => handleMenuItemClick('/collections/kids-on-tour')}>Kids on Tour</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/collections/lifestyle')}>Lifestyle</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/collections/eco-essentials')}>Eco Essentials</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/collections/color-crest')}>Color Crest</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/collections/ladies-vintage')}>Ladies Vintage</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/collections/urban-gold')}>Urban Gold</MenuItem>
            <MenuItem onClick={() => handleMenuItemClick('/collections/signature')}>Signature</MenuItem>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default DropdownMenu;
