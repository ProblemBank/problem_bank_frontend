import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LogoButton() {
  return (
    <IconButton sx={{ padding: '5px' }} size='medium' component={Link} to="/dashboard">
      <img
        src={process.env.PUBLIC_URL + '/logo.png'}
        alt="logo"
        style={{
          height: 50,
        }}
      />
    </IconButton>
  );
}
