import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

export default function NewsUpdateDialogue({ author, preview, content, title, _id, addNewsItem}) {
  const [open, setOpen] = React.useState(false);
  console.log(_id)
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
      const response = await fetch('https://brandshowcaseserver.vercel.app/files/updateNews', { 
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formJson),
      });

      const data = await response.json();
      if (response.ok) {
        addNewsItem(data); 
        handleClose();
      } else {
        console.error('Failed to update news:', data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      
      <Button onClick={handleClickOpen}>
        <ChangeCircleIcon/>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit
        }}
      >
        <DialogTitle>Actualizeaza stirea</DialogTitle>
        <DialogContent>
        <input type="hidden" name="_id" value={_id} />

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
            defaultValue={author}
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
            defaultValue={title}
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
            defaultValue={preview}
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
            defaultValue={content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Inchide</Button>
          <Button type="submit">Actualizeaza</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
