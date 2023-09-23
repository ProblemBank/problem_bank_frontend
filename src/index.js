import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import * as Sentry from "@sentry/react";
import App from './App';
import reduxStore from './redux/store';

Sentry.init({
  dsn: "https://b3fe14df6c45d9216cf4733e2a1778f7@sentry.hamravesh.com/5702",
  tracesSampleRate: 1.0,
  release: 'production',
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [new Sentry.Replay()],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </BrowserRouter>
);
