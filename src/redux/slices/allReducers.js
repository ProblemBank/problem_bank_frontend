import { combineReducers } from 'redux';

import { accountReducer } from './account';
import { currentStateReducer } from './currentState';
import { eventsReducer } from './events'
import { notificationReducer } from './notifications';
import { redirectReducer } from './redirect';
import { translatorReducer } from './translator';
import { widgetReducer } from './widget';
import { workshopReducer } from './workshop'

const allReducers = combineReducers({
  account: accountReducer,
  currentState: currentStateReducer,
  events: eventsReducer,
  workshop: workshopReducer,
  notifications: notificationReducer,
  widget: widgetReducer,
  redirect: redirectReducer,
  Intl: translatorReducer,
});

export default allReducers;
