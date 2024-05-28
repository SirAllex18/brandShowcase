import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";

export default function ControlledAccordions() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Product Description
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            This limited edition T-shit blah blah Description
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Product Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense="true">
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="100% Cotton" />
            </ListItem>
          </List>
          <List dense="true">
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
          </List>
          <List dense="true">
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
