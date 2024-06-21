import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
        <Box sx={{ display: 'flex' }}>
        <CircularProgress/>
        </Box>
    </div>
  );
}