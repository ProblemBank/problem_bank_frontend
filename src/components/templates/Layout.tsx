import { Box, Container } from '@mui/material';
import React, { FC } from 'react';

import Appbar from '../AppBar';

type LayoutPropsType = {
  backgroundImage?: string;
  children: any;
}

const Layout: FC<LayoutPropsType> = ({ backgroundImage, children }) => {
  return (
    <>
      <Box
        sx={{
          transform: 'scale(1.1)',
          height: '100vh',
          width: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
          background: `url(${process.env.PUBLIC_URL + '/background.jpg'})`,
          opacity: '0.10',
          filter: 'blur(1px)',
          zIndex: '-100',
          animation: 'show-back 0.8s 0.3s both',
        }} />
      <Appbar mode='GENERAL_DASHBOARD' position='relative' />
      <Container
        sx={{
          padding: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        maxWidth='lg'>
        {children}
      </Container>
    </>
  );
}

export default Layout;