import React from 'react';

import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

interface BoardProps {
  name: string;
  open?: boolean;
  logo?: string;
  clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

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

const Board = ({ open, name, logo, clickHandler }: BoardProps) => {
  return (
    <ListItem key={name} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        onClick={clickHandler}
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
          {!logo && logo === undefined && (
            <Avatar src={logo} variant="square">
              <AddIcon />
            </Avatar>
          )}
          {!logo && logo !== undefined && (
            <Avatar variant="square" {...stringAvatar(name)} />
          )}
          {logo && <Avatar variant="square" src={logo} />}
        </ListItemIcon>
        <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default Board;
