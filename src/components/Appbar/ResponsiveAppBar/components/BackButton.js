import { Button, IconButton, makeStyles, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'

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
  const history = useHistory()

  return (
    <Button
      onClick={() => history.goBack()}
      variant="contained"
      color="primary">
      {'بازگشت'}
    </Button>
  );
}
