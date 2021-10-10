import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  addProblemToGroupUrl,
  getProblemsByFilter,
  problemCRUDUrl,
  topicCRUDUrl,
  subtopicCRUDUrl,
  removeProblemFromGroupUrl,
} from '../constants/urls';

export const getProblemsByFilterAction = createAsyncThunkApi(
  'problem/getProblemsByFilterAction',
  Apis.POST,
  getProblemsByFilter,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت فیلترشده‌ی مسئله‌ها وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getOneProblemAction = createAsyncThunkApi(
  'problem/getOneProblemAction',
  Apis.GET,
  problemCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const addProblemAction = createAsyncThunkApi(
  'problem/addProblemAction',
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
  'problem/editProblemAction',
  Apis.PATCH,
  problemCRUDUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت ویرایش شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const addProblemToGroupAction = createAsyncThunkApi(
  'problem/addProblemToGroupAction',
  Apis.POST,
  addProblemToGroupUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت به گروه مسئله اضافه شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const removeProblemFromGroupAction = createAsyncThunkApi(
  'problem/removeProblemFromGroupAction',
  Apis.POST,
  removeProblemFromGroupUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت از گروه مسئله حذف شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getTopicAction = createAsyncThunkApi(
  'problem/getTopicAction',
  Apis.GET,
  topicCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت همه‌ی موضوعات وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getSubtopicAction = createAsyncThunkApi(
  'problem/getSubtopicAction',
  Apis.GET,
  subtopicCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت همه‌ی زیرموضوعات وجود داشت. دوباره تلاش کنید.',
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

    [getOneProblemAction.pending.toString()]: isFetching,
    [getOneProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.problem = response;
      state.isFetching = false;
    },
    [getOneProblemAction.rejected.toString()]: isNotFetching,

    [editProblemAction.pending.toString()]: isFetching,
    [editProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      history.back();
      state.isFetching = false;
    },
    [editProblemAction.rejected.toString()]: isNotFetching,

    [addProblemAction.pending.toString()]: isFetching,
    [addProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      history.back();
      state.isFetching = false;
    },
    [addProblemAction.rejected.toString()]: isNotFetching,


    [addProblemToGroupAction.pending.toString()]: isFetching,
    [addProblemToGroupAction.fulfilled.toString()]: isNotFetching,
    [addProblemToGroupAction.rejected.toString()]: isNotFetching,


    [removeProblemFromGroupAction.pending.toString()]: isFetching,
    [removeProblemFromGroupAction.fulfilled.toString()]: isNotFetching,
    [removeProblemFromGroupAction.rejected.toString()]: isNotFetching,


    [getProblemsByFilterAction.pending.toString()]: isFetching,
    [getProblemsByFilterAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.filteredProblems = response.problems;
      state.totalNumberOfPages = response.page;
      state.isFetching = false;
    },
    [getProblemsByFilterAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: problemReducer } = eventSlice;