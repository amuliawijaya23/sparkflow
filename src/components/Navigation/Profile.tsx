import { useState } from 'react';

import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Popover,
} from '@mui/material';

import AccountForm from '@components/AccountForm';

// Redux
import { useAppSelector } from '@redux/hooks';
import { selectUser } from '@redux/reducers/userSlice';
import { signOut } from 'next-auth/react';

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
    sx: { bgcolor: stringToColor(name), width: 40, height: 40 },
    children:
      name.split(' ').length > 1
        ? `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
        : name[0],
  };
};

const Profile = ({ navOpen }: { navOpen: boolean }) => {
  const [open, setOpen] = useState<HTMLDivElement | null>(null);
  const [openAccountForm, setOpenAccountForm] = useState<boolean>(false);

  const user = useAppSelector(selectUser);

  const profileId = open ? 'profile-menu' : undefined;

  const handleProfileOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpen(e.currentTarget);
  };

  const handleProfileClose = () => {
    setOpen(null);
  };

  const handleSignOut = () => {
    localStorage.clear();
    signOut();
  };

  const handleOpenAccountForm = () => {
    setOpenAccountForm(true);
  };

  return (
    <Box>
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            onClick={handleProfileOpen}
            aria-describedby={profileId}
            sx={{
              minHeight: 48,
              justifyContent: navOpen ? 'initial' : 'center',
              px: 2.5,
            }}>
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: navOpen ? 2 : 'auto',
                justifyContent: 'center',
              }}>
              {user?.picture ? (
                <Avatar sx={{ width: 40, height: 40 }} src={user.picture} />
              ) : (
                <Avatar
                  {...stringAvatar(`${user.firstName} ${user.lastName}`)}
                />
              )}
            </ListItemIcon>
            <ListItemText
              primary={`${user.firstName}${
                user.lastName ? ` ${user.lastName}` : ''
              }`}
              sx={{ opacity: navOpen ? 1 : 0 }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Popover
        id={profileId}
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleProfileClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}>
        <List disablePadding>
          {['Account', 'Logout'].map((title, index) => (
            <ListItem
              key={`${title}-profile-item`}
              disablePadding
              sx={{ display: 'block' }}>
              <ListItemButton
                onClick={index === 0 ? handleOpenAccountForm : handleSignOut}
                sx={{
                  justifyContent: 'initial',
                  px: 10,
                }}>
                <ListItemText
                  primary={title}
                  sx={{ opacity: Boolean(open) ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
      <AccountForm
        open={openAccountForm}
        setOpenAccountForm={setOpenAccountForm}
      />
    </Box>
  );
};

export default Profile;
