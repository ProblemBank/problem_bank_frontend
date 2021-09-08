import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  eventCRUDUrl,
} from '../constants/urls';

export const getEventAction = createAsyncThunkApi(
  'events/getProblemAction',
  Apis.GET,
  eventCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const addEventAction = createAsyncThunkApi(
  'events/addProblemAction',
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
  'events/editProblemAction',
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
  problems: [],
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

    [getEventAction.pending.toString()]: isFetching,
    [getEventAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.event = response;
      state.isFetching = false;
    },
    [getEventAction.rejected.toString()]: isNotFetching,

    [editEventAction.pending.toString()]: isFetching,
    [editEventAction.fulfilled.toString()]: isNotFetching,
    [editEventAction.rejected.toString()]: isNotFetching,

    [addEventAction.pending.toString()]: isFetching,
    [addEventAction.fulfilled.toString()]: isNotFetching,
    [addEventAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: eventReducer } = eventSlice;