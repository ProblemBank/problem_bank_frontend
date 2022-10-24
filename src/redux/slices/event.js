import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  eventCRUDUrl,
  getEventsUrl,
  getAllMyEventUrl,
  getOneEventUrl,
  joinEventUrl,
  eventUrl,
} from '../constants/urls';

export const createEventAction = createAsyncThunkApi(
  'event/createEventAction',
  Apis.POST,
  eventUrl,
  {
    defaultNotification: {
      success: 'کلاس با موفقیت ساخته شد.',
      error: 'مشکلی  در ایجاد کلاس وجود داشت.',
    },
  }
);

export const getEventsAction = createAsyncThunkApi(
  'event/getEventsAction',
  Apis.POST,
  getEventsUrl,
  {
    defaultNotification: {
      error: 'مشکلی  در دریافت کلاس‌ها وجود داشت.',
    },
  }
);


export const getOneEventAction = createAsyncThunkApi(
  'event/getOneEventAction',
  Apis.GET,
  getOneEventUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت کلاس وجود داشت.',
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
      error: 'مشکلی در ایجاد کلاس وجود داشت.',
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
      error: 'مشکلی در ویرایش کلاس وجود داشت.',
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
    [createEventAction.pending.toString()]: isFetching,
    [createEventAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.events = [...state.events, response];
      state.isFetching = false;
    },
    [createEventAction.rejected.toString()]: isNotFetching,

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