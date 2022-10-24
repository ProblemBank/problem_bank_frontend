import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  useScrollTrigger,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HideOnScroll from './components/HideOnScroll';
import modes from './modes';
import useWidth from '../../utils/UseWidth';

type AppbarPropsType = {
  mode: string;
  showBackOnScroll?: boolean;
  hideOnScroll?: boolean;
  position: "fixed" | "absolute" | "sticky" | "static" | "relative";
}

const ResponsiveAppBar: FC<AppbarPropsType> = ({
  mode = 'LANDING',
  showBackOnScroll = false,
  hideOnScroll = false,
  position = 'fixed',
}) => {
  const { eventId } = useParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 30 });
  const width = useWidth();

  const {
    desktopLeftItems,
    desktopRightItems,
    mobileLeftItems,
    mobileRightItems,
    mobileMenuListItems,
  } = modes[mode]();

  const rightItems = width === 'xs' ? mobileRightItems : desktopRightItems;
  const leftItems = width === 'xs' ? mobileLeftItems : desktopLeftItems;

  return (
    <>
      <HideOnScroll disable={!hideOnScroll}>
        <AppBar
          sx={
            (showBackOnScroll && !trigger) ?
              {
                transition: '0.2s',
                background: 'transparent',
                boxShadow: 'none',
                paddingTop: 4,
              } :
              {
                transition: '0.2s',
              }
          }
          id='appBar'
          position={position}
          color='inherit'>
          <Container>
            <Toolbar disableGutters>
              <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {mobileMenuListItems.length > 0 && (
                    <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                      <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setDrawerOpen(!drawerOpen)}
                        size="large">
                        <MenuIcon />
                      </IconButton>
                    </Box>
                  )}
                  {rightItems.map((item, index) => (
                    <Box mr={1} key={index}>
                      {item}
                    </Box>
                  ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {leftItems.map((item, index) => (
                    <Box ml={1} key={index}>
                      {item}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Drawer
        anchor="left" open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 240 }}>
          {mobileMenuListItems.map((item, index) => (
            <ListItem key={index}>{item}</ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default ResponsiveAppBar;