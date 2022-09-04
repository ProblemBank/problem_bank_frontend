import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  problemGroupCRUDUrl,
  removeProblemFromGroupUrl,
} from '../constants/urls';

export const getProblemGroupAction = createAsyncThunkApi(
  'events/getProblemGroupAction',
  Apis.GET,
  problemGroupCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const addProblemGroupAction = createAsyncThunkApi(
  'events/addProblemGroupAction',
  Apis.POST,
  problemGroupCRUDUrl,
  {
    defaultNotification: {
      success: 'صندوقچه با موفقیت اضافه شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const removeProblemGroupAction = createAsyncThunkApi(
  'events/removeProblemGroupAction',
  Apis.DELETE,
  problemGroupCRUDUrl,
  {
    defaultNotification: {
      success: 'صندوقچه با موفقیت حذف شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const editProblemGroupAction = createAsyncThunkApi(
  'events/editProblemGroupAction',
  Apis.PATCH,
  problemGroupCRUDUrl,
  {
    defaultNotification: {
      success: 'صندوقچه با موفقیت ویرایش شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const removeProblemFromGroupAction = createAsyncThunkApi(
  'problem/removeProblemFromGroupAction',
  Apis.DELETE,
  removeProblemFromGroupUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت از گروه مسئله حذف شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

const initialState = {
  isFetching: false,
  problemGroup: null,
};

const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const slice = createSlice({
  name: 'problemGroup',
  initialState,
  reducers: {
    clearProblemGroup: (state) => {
      console.log("@@@@@@@@@@")
      // state.problemGroup = null;
      return initialState
    },
  },
  extraReducers: {

    [getProblemGroupAction.pending.toString()]: isFetching,
    [getProblemGroupAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.problemGroup = response;
      state.isFetching = false;
    },
    [getProblemGroupAction.rejected.toString()]: isNotFetching,

    [editProblemGroupAction.pending.toString()]: isFetching,
    [editProblemGroupAction.fulfilled.toString()]: isNotFetching,
    [editProblemGroupAction.rejected.toString()]: isNotFetching,

    [addProblemGroupAction.pending.toString()]: isFetching,
    [addProblemGroupAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      setTimeout(() => {
        window.location.reload();
      }, 1000)
      state.isFetching = false;
    },
    [addProblemGroupAction.rejected.toString()]: isNotFetching,

    [removeProblemFromGroupAction.pending.toString()]: isFetching,
    [removeProblemFromGroupAction.fulfilled.toString()]: isNotFetching,
    [removeProblemFromGroupAction.rejected.toString()]: isNotFetching,

    [removeProblemGroupAction.pending.toString()]: isFetching,
    [removeProblemGroupAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      // todo:
      setTimeout(() => {
        window.location.reload();
      }, 1000)
      state.isFetching = false;
    },
    [removeProblemGroupAction.rejected.toString()]: isNotFetching,

  },
});

export const { clearProblemGroup: clearProblemGroupAction } = slice.actions;

export const { reducer: problemGroupReducer } = slice;