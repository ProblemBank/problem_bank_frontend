import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  addProblemToGroupUrl,
  problemCRUDUrl,
} from '../constants/urls';


export const getProblemAction = createAsyncThunkApi(
  'events/getProblemAction',
  Apis.GET,
  problemCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const addProblemAction = createAsyncThunkApi(
  'events/addProblemAction',
  Apis.POST,
  problemCRUDUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت اضافه شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const editProblemAction = createAsyncThunkApi(
  'events/editProblemAction',
  Apis.PATCH,
  problemCRUDUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت ویرایش شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

// todo: fix url
export const addProblemToGroupAction = createAsyncThunkApi(
  'events/addProblemToGroupAction',
  Apis.POST,
  addProblemToGroupUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت به گروه مسئله اضافه شد!',
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

    [getProblemAction.pending.toString()]: isFetching,
    [getProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.problem = response;
      state.isFetching = false;
    },
    [getProblemAction.rejected.toString()]: isNotFetching,

    [editProblemAction.pending.toString()]: isFetching,
    [editProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      setTimeout(() => {
        history.back();
      }, 2000)
    },
    [editProblemAction.rejected.toString()]: isNotFetching,

    [addProblemAction.pending.toString()]: isFetching,
    [addProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      setTimeout(() => {
        history.back();
      }, 2000)
    },
    [addProblemAction.rejected.toString()]: isNotFetching,

    [addProblemToGroupAction.pending.toString()]: isFetching,
    [addProblemToGroupAction.fulfilled.toString()]: isNotFetching,
    [addProblemToGroupAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: problemReducer } = eventSlice;