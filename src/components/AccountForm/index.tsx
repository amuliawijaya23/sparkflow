import React, { useState, useCallback, SetStateAction } from 'react';
import { useDropzone } from 'react-dropzone';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Unstable_Grid2 as Grid,
  Avatar,
  Typography,
  TextField,
  IconButton,
} from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';

import useAccountForm from '@hooks/useAccountForm';

const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  for (i = 0; i < 3; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

const stringAvatar = (name: string) => {
  return {
    sx: { bgcolor: stringToColor(name), width: 50, height: 50 },
    children:
      name.split(' ').length > 1
        ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        : name[0],
  };
};

const AccountForm = ({
  openForm,
  setOpenAccountForm,
}: {
  openForm: boolean;
  setOpenAccountForm: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [openDropzone, setOpenDropzone] = useState(false);

  const { user, image, submitHandler, setImage } = useAccountForm();

  const handleClose = () => {
    setOpenAccountForm(false);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImage(acceptedFiles[0]);
    setOpenDropzone(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  return (
    <>
      <Dialog open={openForm} onClose={handleClose} maxWidth={'sm'} fullWidth>
        <DialogTitle>Account Setting</DialogTitle>
        <DialogContent>
          <Grid container sx={{ width: '100%' }}>
            <Grid xs={12} sx={{ p: 1, mb: 1 }}>
              <IconButton onClick={() => setOpenDropzone(true)}>
                {image ? (
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={URL.createObjectURL(image)}
                    alt="temp profile image"
                  />
                ) : (
                  <Avatar
                    {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                  />
                )}
              </IconButton>
            </Grid>
            <Grid xs={12} md={6} sx={{ mt: 0.5, p: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="First Name"
              />
            </Grid>
            <Grid xs={12} md={6} sx={{ mt: 0.5, p: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Last Name"
              />
            </Grid>
            <Grid xs={12} sx={{ mt: 1 }}></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={submitHandler}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDropzone}
        onClose={() => setOpenDropzone(false)}
        maxWidth={'xs'}
        fullWidth>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'center',
            borderBottom: 1,
            p: 3,
          }}>
          Update Profile Picture
        </DialogTitle>
        <DialogContent
          {...getRootProps()}
          sx={{
            minHeight: 400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <FileUploadIcon sx={{ width: 150, height: 150 }} />
          ) : (
            <Avatar sx={{ width: 150, height: 150 }} />
          )}
          <Typography variant="h6" textAlign="center" sx={{ mt: 2, mb: 2 }}>
            Drag photo here
            <br />
            - or -
            <br />
          </Typography>
          <Button variant="contained" onClick={open}>
            Upload from computer
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AccountForm;
