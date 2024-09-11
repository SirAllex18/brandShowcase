import * as React from "react";
import { useState, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDropzone } from 'react-dropzone';
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { Typography, Box } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function NewsDialogue({ addNewsItem }) {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImage(null); // Reset image state when closing the dialog
  };

  const handleDrop = useCallback((acceptedFiles) => {
    setImage(acceptedFiles[0]);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append('author', event.target.author.value);
    formData.append('title', event.target.title.value);
    formData.append('preview', event.target.preview.value);
    formData.append('content', event.target.content.value);

    if (image) {
      formData.append('image', image);
    }

    console.log("FormData", formData)

    try {
      const response = await fetch('https://brandshowcaseserver.vercel.app/files/fileInsert', { 
        method: 'POST',
        body: formData,
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
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Box
                {...getRootProps()}
                border="2px dashed #ccc"
                p="1rem"
                sx={{ "&:hover": { cursor: "pointer" } }}
              >
                <input {...getInputProps()} />
                {!image ? (
                  <p>Add Picture Here</p>
                ) : (
                  <FlexBetween>
                    <Typography>{image.name}</Typography>
                    <EditOutlinedIcon />
                  </FlexBetween>
                )}
              </Box>
            )}
          </Dropzone>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Inchide</Button>
          <Button type="submit">Posteaza</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
