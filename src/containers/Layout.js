import { Container, makeStyles } from '@material-ui/core';
import React from 'react';

import AppBar from '../components/Appbar/ResponsiveAppBar';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    marginRight: 'auto !important',
    marginLeft: 'auto !important',
  },
  background: {
    transform: 'scale(1.1)',
    height: '100vh',
    width: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    background: `url(${process.env.PUBLIC_URL + '/background.jpg'})`,
    opacity: '0.10',
    filter: 'grayscale(100%)',
    zIndex: '-1',
    animation: 'show-back 0.8s 0.3s both',
  },
}));

const Layout = ({ backgroundImage, ...props }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.background} />
      <AppBar mode='GENERAL_DASHBOARD' position='relative' />
      <Container maxWidth='lg' className={classes.container} >
        {props.children}
      </Container>
    </>
  );
}

export default Layout;