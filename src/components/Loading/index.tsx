import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loading;
