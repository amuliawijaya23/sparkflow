import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Unstable_Grid2 as Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Autocomplete,
  Typography,
  TextField,
  Chip,
  ListItem,
  ListItemText,
} from '@mui/material';

import useBoardForm from '@hooks/useBoardForm';
import React from 'react';

const BoardForm = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { name, team, users, setTeam, handleChangeName, handleCreateForm } =
    useBoardForm();

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleCreateForm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={'sm'} fullWidth>
      <DialogTitle>Create Board</DialogTitle>
      <DialogContent>
        <Grid container sx={{ width: '100%' }}>
          <Grid xs={12} md={6} sx={{ mt: 1 }}>
            <FormControl fullWidth size="small" variant="outlined">
              <InputLabel htmlFor="outlined-board-name">Board Name</InputLabel>
              <OutlinedInput
                id="outlined-board-name"
                label="Board Name"
                value={name}
                onChange={handleChangeName}
              />
            </FormControl>
          </Grid>
          <Grid xs={12} sx={{ mt: 4 }}>
            <Typography component="p" variant="body1" sx={{ mb: 1.5 }}>
              <b>Invite team members to your board</b>
            </Typography>
            <Autocomplete
              multiple
              options={users.map((u) => u.email)}
              value={team}
              onChange={(event, newValue) => {
                setTeam(newValue);
              }}
              renderOption={(props, option) => (
                <ListItem {...props} key={`${option}-option`}>
                  <ListItemText
                    primary={option}
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                </ListItem>
              )}
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={`${option}-tag`}
                    variant="outlined"
                    label={option}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  key="email-address-search"
                  label="Email address or Username"
                  variant="outlined"
                  size="small"
                />
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} type="submit" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardForm;
