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
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  IconButton,
  Alert,
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

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
    sx: { bgcolor: stringToColor(name), width: 55, height: 55 },
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

  const {
    user,
    image,
    firstName,
    lastName,
    dateOfBirth,
    linkedIn,
    instagram,
    twitter,
    github,
    isLinkedInURL,
    isInstagramURL,
    isTwitterURL,
    isGithubURL,
    error,
    submitHandler,
    setImage,
    handleFirstNameChange,
    handleLastNameChange,
    handleDateOfBirthChange,
    handleLinkedInChange,
    handleInstagramChange,
    handleTwitterChange,
    handleGithubChange,
    resetForm,
  } = useAccountForm();

  const handleClose = () => {
    setOpenAccountForm(false);
    resetForm();
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setImage(acceptedFiles[0]);
      setOpenDropzone(false);
    },
    [setImage],
  );

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
                {image && (
                  <Avatar
                    sx={{ width: 55, height: 55 }}
                    src={URL.createObjectURL(image)}
                    alt="temp profile image"
                  />
                )}
                {!image && user.picture && (
                  <Avatar
                    sx={{ width: 55, height: 55 }}
                    src={user.picture}
                    alt="profile image"
                  />
                )}
                {!image && !user.picture && (
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
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Grid>
            <Grid xs={12} md={6} sx={{ mt: 0.5, p: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                size="small"
                label="Last Name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Grid>
            <Grid xs={6} sx={{ mt: 0.5, p: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date of Birth"
                  slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} sx={{ mt: 1, p: 1 }}>
              <Typography variant="h6" component={'p'}>
                Social Profile
              </Typography>
            </Grid>
            <Grid xs={6} sx={{ mt: 0.5, p: 1 }}>
              <FormControl fullWidth size="small" variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-linkedIn"
                  type="text"
                  placeholder="LinkedIn URL"
                  onChange={handleLinkedInChange}
                  value={linkedIn}
                  startAdornment={
                    <InputAdornment position="start">
                      <LinkedInIcon />
                    </InputAdornment>
                  }
                />
                {!isLinkedInURL && linkedIn && linkedIn.length > 0 && (
                  <FormHelperText>Please enter a valid url.</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ mt: 0.5, p: 1 }}>
              <FormControl fullWidth size="small" variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-instagram"
                  type="text"
                  placeholder="Instagram URL"
                  onChange={handleInstagramChange}
                  value={instagram}
                  startAdornment={
                    <InputAdornment position="start">
                      <InstagramIcon />
                    </InputAdornment>
                  }
                />
                {!isInstagramURL && instagram && instagram.length > 0 && (
                  <FormHelperText>Please enter a valid url.</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ mt: 0.5, p: 1 }}>
              <FormControl fullWidth size="small" variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-twitter"
                  type="text"
                  placeholder="Twitter URL"
                  onChange={handleTwitterChange}
                  value={twitter}
                  startAdornment={
                    <InputAdornment position="start">
                      <TwitterIcon />
                    </InputAdornment>
                  }
                />
                {!isTwitterURL && twitter && twitter.length > 0 && (
                  <FormHelperText>Please enter a valid url.</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ mt: 0.5, p: 1 }}>
              <FormControl fullWidth size="small" variant="outlined">
                <OutlinedInput
                  id="outlined-adornment-github"
                  type="text"
                  placeholder="Github URL"
                  onChange={handleGithubChange}
                  value={github}
                  startAdornment={
                    <InputAdornment position="start">
                      <GitHubIcon />
                    </InputAdornment>
                  }
                />
                {!isGithubURL && github && github.length > 0 && (
                  <FormHelperText>Please enter a valid url.</FormHelperText>
                )}
              </FormControl>
            </Grid>
            {error && (
              <Grid xs={12} sx={{ mt: 1, p: 1 }}>
                <Alert severity="error">{error}</Alert>
              </Grid>
            )}
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
