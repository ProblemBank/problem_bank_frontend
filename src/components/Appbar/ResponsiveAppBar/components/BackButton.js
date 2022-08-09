import { Button, IconButton, Tooltip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  logo: ({ size }) => ({
    height: size === 'large' ? 70 : 50,
  }),
  logoButton: ({ size }) => ({
    padding: size === 'large' ? 5 : 0,
  }),
}));

export default function LogoButton({ size }) {
  const classes = useStyles({ size });
  const navigate = useNavigate()

  return (
    <Button
      onClick={() => navigate(-1)}
      variant="contained"
      color="primary">
      {'بازگشت'}
    </Button>
  );
}
