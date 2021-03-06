import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  eventCRUDUrl,
  getAllEventUrl,
  getAllMyEventUrl,
  getOneEventUrl,
  joinEventUrl,
} from '../constants/urls';

export const getAllEventsAction = createAsyncThunkApi(
  'event/getAllEventsAction',
  Apis.GET,
  getAllEventUrl,
  {
    defaultNotification: {
      error: 'مشکلی  در دریافت رویدادها وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getAllMyEventsAction = createAsyncThunkApi(
  'event/getAllMyEventsAction',
  Apis.GET,
  getAllMyEventUrl,
  {
    defaultNotification: {
      error: 'مشکلی  در دریافت همه‌ی رویدادهای من وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getOneEventAction = createAsyncThunkApi(
  'event/getOneEventAction',
  Apis.GET,
  getOneEventUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت یک رویداد وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const addEventAction = createAsyncThunkApi(
  'event/addEventAction',
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
  'event/editEventAction',
  Apis.PATCH,
  eventCRUDUrl,
  {
    defaultNotification: {
      success: 'رویداد با موفقیت ویرایش شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const joinEventAction = createAsyncThunkApi(
  'event/joinEventAction',
  Apis.POST,
  joinEventUrl,
  {
    defaultNotification: {
      success: 'شما با موفقیت به رویداد اضافه شدید!',
      error: 'رمز وارد شده اشتباه است.',
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
  name: 'event',
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
      state.allEvents = response.events;
      state.isFetching = false;
    },
    [getAllEventsAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: eventReducer } = eventSlice;