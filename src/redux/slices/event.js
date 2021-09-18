import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  eventCRUDUrl,
} from '../constants/urls';

export const getAllEventsAction = createAsyncThunkApi(
  'events/getAllEventsAction',
  Apis.GET,
  eventCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی  در دریافت رویدادها وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getOneEventAction = createAsyncThunkApi(
  'events/getOneEventAction',
  Apis.GET,
  eventCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت یک رویداد وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const addEventAction = createAsyncThunkApi(
  'events/addEventAction',
  Apis.POST,
  eventCRUDUrl,
  {
    defaultNotification: {
      success: 'رویداد با موفقیت اضافه شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const editEventAction = createAsyncThunkApi(
  'events/editEventAction',
  Apis.PATCH,
  eventCRUDUrl,
  {
    defaultNotification: {
      success: 'رویداد با موفقیت ویرایش شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);



const initialState = {
  isFetching: false,
  allEvents: [],
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  extraReducers: {

    [getOneEventAction.pending.toString()]: isFetching,
    [getOneEventAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.event = response;
      state.isFetching = false;
    },
    [getOneEventAction.rejected.toString()]: isNotFetching,

    [editEventAction.pending.toString()]: isFetching,
    [editEventAction.fulfilled.toString()]: isNotFetching,
    [editEventAction.rejected.toString()]: isNotFetching,

    [addEventAction.pending.toString()]: isFetching,
    [addEventAction.fulfilled.toString()]: isNotFetching,
    [addEventAction.rejected.toString()]: isNotFetching,

    [getAllEventsAction.pending.toString()]: isFetching,
    [getAllEventsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allEvents = response;
      state.isFetching = false;
    },
    [getAllEventsAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: eventReducer } = eventSlice;