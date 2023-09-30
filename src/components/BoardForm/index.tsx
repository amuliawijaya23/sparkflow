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
} from '@mui/material';

import useBoardForm from '@hooks/useBoardForm';

const BoardForm = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { name, team, users, setTeam, handleChangeName } = useBoardForm();

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'xs'}>
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
        <Button type="submit" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BoardForm;
