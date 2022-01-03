import { Container, makeStyles } from '@material-ui/core';
import React from 'react';

import AppBar from '../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    //todo: fix hard number
    maxWidth: '1280px !important',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
}));

const Layout = (props) => {
  const classes = useStyles();

  return (
    <>
      <AppBar mode='GENERAL_DASHBOARD' position='relative' />
      <Container className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

export default Layout;