import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const Loading = () => {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CircularProgress size={'4.5rem'} />
    </Box>
  );
};
