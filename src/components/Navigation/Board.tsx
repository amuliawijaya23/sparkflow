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
  open: boolean;
  logo?: string;
  clickHandler: (event: React.MouseEvent<HTMLDivElement>) => void;
}

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
          <Avatar src={logo} variant="square" sx={{ bgcolor: '#002147' }}>
            <AddIcon />
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={name} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default Board;
