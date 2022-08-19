import './configs/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, LinearProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { CacheProvider } from "@emotion/react";
import createEmotionCache from './configs/createEmotionCache'
import selectTheme from './configs/themes';
import { SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-redux-multilingual';
import { useNavigate } from 'react-router-dom';
import Notifier from './components/Notifications/Notifications';
import { initRedirectAction } from './redux/slices/redirect';
import Root from './root';
import translations from './translations';
import { Slide, ToastContainer } from 'react-toastify';


const App = ({ dir, redirectTo, forceRedirect, initRedirect, isFetching }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (redirectTo !== null) {
      navigate(redirectTo);
      if (forceRedirect) {
        navigate(redirectTo);
        navigate('/loading/');
        navigate(-1);
      } else {
        navigate(redirectTo);
      }
      initRedirect();
    }
  }, [redirectTo, forceRedirect, initRedirect, navigate]);

  useEffect(() => {
    document.body.dir = dir;
  }, [dir]);

  const Loading = () => {
    if (isFetching) {
      return (
        <div
          style={{
            width: '100%',
            position: 'fixed',
            top: '0px',
            zIndex: '99999',
          }}>
          <LinearProgress />
        </div>
      );
    } else {
      return <></>;
    }
  };

  return (
    <IntlProvider translations={translations}>
      <CacheProvider value={createEmotionCache(dir)}>
        <ThemeProvider theme={selectTheme(dir)}>
          <SnackbarProvider>
            <ToastContainer
              rtl
              position="top-left"
              autoClose={3000}
              transition={Slide}
              newestOnTop
              hideProgressBar={false}
              pauseOnHover={false}
              pauseOnFocusLoss={false}
              closeOnClick
              limit={3}
              draggable={false}
            />
            <Loading />
            <Notifier />
            <CssBaseline />
            <Root />
          </SnackbarProvider>
        </ThemeProvider>
      </CacheProvider>
    </IntlProvider>
  );
};

const mapStateToProps = (state) => ({
  dir: state.Intl.locale === 'fa' ? 'rtl' : 'ltr',
  redirectTo: state.redirect.redirectTo,
  forceRedirect: state.redirect.force,
  isFetching: state.account.isFetching || state.problem.isFetching || state.event.isFetching || state.problemGroup.isFetching,
});

export default connect(
  mapStateToProps,
  {
    initRedirect: initRedirectAction,
  }
)(App);
