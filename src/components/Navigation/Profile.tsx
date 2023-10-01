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

// Redux
import { useAppSelector } from '@redux/hooks';
import { selectUser } from '@redux/reducers/userSlice';
import { signOut } from 'next-auth/react';

const Profile = ({ navOpen }: { navOpen: boolean }) => {
  const [open, setOpen] = useState<HTMLDivElement | null>(null);

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
              <Avatar
                alt={user.username}
                src={user.picture || ''}
                sx={{
                  height: 35,
                  width: 35,
                  bgcolor: '',
                }}>
                {user?.username && user.username[0].toUpperCase()}
              </Avatar>
            </ListItemIcon>
            <ListItemText
              primary={user.username}
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
                onClick={index === 0 ? () => {} : handleSignOut}
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
    </Box>
  );
};

export default Profile;
