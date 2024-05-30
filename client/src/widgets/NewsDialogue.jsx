import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function NewsDialogue({ addNewsItem }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    console.log('Submitting form...');
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch('http://localhost:3001/files/fileInsert', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('News added:', data);
        addNewsItem(data); 
        handleClose();
      } else {
        console.error('Failed to add news:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Adauga stire
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Compune stirea</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="author"
            name="author"
            label="Autor"
            type="text"
            variant="standard"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Titlu"
            type="text"
            variant="standard"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="preview"
            name="preview"
            label="Preview"
            type="text"
            variant="standard"
            fullWidth
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="content"
            name="content"
            label="Continut"
            type="text"
            fullWidth
            multiline
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Inchide</Button>
          <Button type="submit">Posteaza</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
