import React from "react";
import {
  Typography,
  Avatar,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import FlexBetween from "components/FlexBetween";
import { useNavigate } from "react-router-dom";



const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <FlexBetween>
        <Avatar
          src={`${process.env.PUBLIC_URL}/assets/logo.jpg`}
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: "blue",
              cursor: "pointer",
            },
            width: 56,
            height: 56,
          }}
        />
        <FlexBetween>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookTwoToneIcon sx={{ margin: "1rem" }} />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon sx={{ margin: "1rem" }} />
          </a>
          <a href="https://www.x.com" target="_blank" rel="noopener noreferrer">
            <XIcon sx={{ margin: "1rem" }} />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon sx={{ margin: "1rem" }} />
          </a>
        </FlexBetween>
      </FlexBetween>
      <Divider flexItem sx={{ margin: "5px" }} />
      <FlexBetween>
        <Typography>Soverign Blues All rights reserved</Typography>
        <FlexBetween>
          <Typography sx={{ margin: "2px" }}>Legal Notice</Typography>
          <Typography sx={{ margin: "0 8px" }}>•</Typography>
          <Typography sx={{ margin: "2px" }}>Privacy Policy</Typography>
          <Typography sx={{ margin: "0 8px" }}>•</Typography>
          <Typography sx={{ margin: "2px" }}>Cookies Policy</Typography>
          <Typography sx={{ margin: "0 8px" }}>•</Typography>
          <Typography sx={{ margin: "2px" }}>Information Channel</Typography>
        </FlexBetween>
      </FlexBetween>
    </>
  );
};

export default Footer;
