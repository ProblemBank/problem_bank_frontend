import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  eventCRUDUrl,
  getEventsUrl,
  getAllMyEventUrl,
  getOneEventUrl,
  joinEventUrl,
} from '../constants/urls';

export const getEventsAction = createAsyncThunkApi(
  'event/getEventsAction',
  Apis.POST,
  getEventsUrl,
  {
    defaultNotification: {
      error: 'مشکلی  در دریافت کلاس‌ها وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getAllMyEventsAction = createAsyncThunkApi(
  'event/getAllMyEventsAction',
  Apis.GET,
  getAllMyEventUrl,
  {
    defaultNotification: {
      error: 'مشکلی  در دریافت همه‌ی کلاس‌های من وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getOneEventAction = createAsyncThunkApi(
  'event/getOneEventAction',
  Apis.GET,
  getOneEventUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت یک کلاس وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const addEventAction = createAsyncThunkApi(
  'event/addEventAction',
  Apis.POST,
  eventCRUDUrl,
  {
    defaultNotification: {
      success: 'کلاس با موفقیت اضافه شد!',
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
      success: 'کلاس با موفقیت ویرایش شد!',
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
      success: 'شما با موفقیت به کلاس اضافه شدید!',
      error: 'رمز وارد شده اشتباه است.',
    },
  }
);



const initialState = {
  isFetching: false,
  events: [],
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

    [getEventsAction.pending.toString()]: isFetching,
    [getEventsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.events = response;
      state.isFetching = false;
    },
    [getEventsAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: eventReducer } = eventSlice;