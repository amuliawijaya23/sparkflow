import React, { SetStateAction } from 'react';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Unstable_Grid2 as Grid,
  Avatar,
  FormControl,
  InputLabel,
  OutlinedInput,
  Autocomplete,
  Typography,
  TextField,
  Chip,
  IconButton,
} from '@mui/material';

import { useAppSelector } from '@redux/hooks';
import { selectUser } from '@redux/reducers/userSlice';

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
  open,
  setOpenAccountForm,
}: {
  open: boolean;
  setOpenAccountForm: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const user = useAppSelector(selectUser);

  const handleClose = () => {
    setOpenAccountForm(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>Account Setting</DialogTitle>
      <DialogContent>
        <Grid container sx={{ width: '100%' }}>
          <Grid xs={12} sx={{ p: 1, mb: 1 }}>
            {user?.picture ? (
              <IconButton>
                <Avatar sx={{ width: 50, height: 50 }} src={user.picture} />
              </IconButton>
            ) : (
              <IconButton>
                <Avatar
                  {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                />
              </IconButton>
            )}
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
        <Button variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountForm;
