import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  Avatar,
  Popover,
  Paper,
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ConstructionIcon from '@mui/icons-material/Construction';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Redux
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { toggleMode, selectTheme } from '@redux/reducers/themeSlice';
import { selectUser } from '@redux/reducers/userSlice';

import { signOut } from 'next-auth/react';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Sidebar = ({
  children,
  avatarColor,
}: {
  children: React.ReactNode;
  avatarColor: string;
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<HTMLDivElement | null>(null);

  const profileId = profile ? 'profile-menu' : undefined;

  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectTheme);
  const user = useAppSelector(selectUser);

  const toggleThemeMode = () => {
    dispatch(toggleMode());
  };

  const handleSidebarOpen = () => {
    setOpen(true);
  };

  const handleSidebarClose = () => {
    setOpen(false);
  };

  const handleProfileOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    setProfile(e.currentTarget);
  };

  const handleProfileClose = () => {
    setProfile(null);
  };

  return (
    <Box component={Paper} sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleSidebarOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              SparkFlow
            </Typography>
          </Box>
          <Box
            sx={{
              minWidth: 125,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 1,
            }}>
            <Typography variant="body1">
              {mode[0].toUpperCase() + mode.substring(1)} Mode
            </Typography>
            <IconButton
              onClick={toggleThemeMode}
              color={mode === 'light' ? 'secondary' : 'info'}>
              {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        onMouseEnter={handleSidebarOpen}
        onMouseLeave={handleSidebarClose}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Box sx={{ height: '100%' }}>
          <DrawerHeader>
            <IconButton onClick={handleSidebarClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {['Dashboard', 'Projects', 'Tasks', 'Team'].map((text, index) => (
              <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}>
                    {index === 0 && <DashboardIcon />}
                    {index === 1 && <ConstructionIcon />}
                    {index === 2 && <FormatListBulletedIcon />}
                    {index === 3 && <PeopleIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleProfileOpen}
                aria-describedby={profileId}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}>
                  <Avatar
                    alt={user.username}
                    src={user.picture || ''}
                    sx={{
                      height: 35,
                      width: 35,
                      bgcolor: avatarColor,
                    }}>
                    {user.username[0]?.toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={user.username}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          </List>
          <Popover
            id={profileId}
            open={Boolean(profile)}
            anchorEl={profile}
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
                    onClick={index === 0 ? () => {} : () => signOut()}
                    sx={{
                      justifyContent: 'initial',
                      px: 10,
                    }}>
                    <ListItemText
                      primary={title}
                      sx={{ opacity: Boolean(profile) ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Popover>
        </Box>
      </Drawer>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
