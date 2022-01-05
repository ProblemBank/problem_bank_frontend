import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  addProblemToGroupUrl,
  copyProblemToGroup,
  getProblemsByFilter,
  problemCRUDUrl,
  sourceCRUDUrl,
  submitAnswerUrl,
  subtopicCRUDUrl,
  topicCRUDUrl,
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

export const removeProblemAction = createAsyncThunkApi(
  'problem/removeProblemAction',
  Apis.DELETE,
  problemCRUDUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت حذف شد!',
      error: 'مشکلی در حذف‌کردن مسئله وجود داشت.',
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
      error: 'مشکلی در اضافه‌کردن مسئله به گروه‌مسسله وجود داشت.',
    },
  }
);

export const copyProblemToGroupAction = createAsyncThunkApi(
  'problem/copyProblemToGroupAction',
  Apis.POST,
  copyProblemToGroup,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت در گروه‌مسئله کپی شد!',
      error: 'مشکلی در کپی‌کردن مسئله در گروه‌مسئله وجود داشت.',
    },
  }
);

export const getAllTopicsAction = createAsyncThunkApi(
  'problem/getAllTopicsAction',
  Apis.GET,
  topicCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت همه‌ی موضوعات وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getAllSubtopicsAction = createAsyncThunkApi(
  'problem/getAllSubtopicsAction',
  Apis.GET,
  subtopicCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت همه‌ی زیرموضوعات وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const getAllSourcesAction = createAsyncThunkApi(
  'problem/getAllSourcesAction',
  Apis.GET,
  sourceCRUDUrl,
  {
    defaultNotification: {
      error: 'مشکلی در دریافت منابع وجود داشت. دوباره تلاش کنید.',
    },
  }
);

export const submitAnswerAction = createAsyncThunkApi(
  'problem/submitAnswerAction',
  Apis.POST_FORM_DATA,
  submitAnswerUrl,
  {
    defaultNotification: {
      success: 'شما پاسخ مسئله را با موفقیت ثبت کردید!',
      error: 'مشکلی در ارسال پاسخِ مسئله وجود داشت. دوباره تلاش کنید.',
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
  name: 'problem',
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

    [removeProblemAction.pending.toString()]: isFetching,
    [removeProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      history.go(-2);
      state.isFetching = false;
    },
    [removeProblemAction.rejected.toString()]: isNotFetching,

    [addProblemToGroupAction.pending.toString()]: isFetching,
    [addProblemToGroupAction.fulfilled.toString()]: isNotFetching,
    [addProblemToGroupAction.rejected.toString()]: isNotFetching,

    [getProblemsByFilterAction.pending.toString()]: isFetching,
    [getProblemsByFilterAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.filteredProblems = response.problems;
      state.totalNumberOfPages = response.pages_count;
      state.isFetching = false;
    },
    [getProblemsByFilterAction.rejected.toString()]: isNotFetching,

    [getAllTopicsAction.pending.toString()]: isFetching,
    [getAllTopicsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allTopics = response;
      state.isFetching = false;
    },
    [getAllTopicsAction.rejected.toString()]: isNotFetching,

    [getAllSubtopicsAction.pending.toString()]: isFetching,
    [getAllSubtopicsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allSubtopics = response;
      state.isFetching = false;
    },
    [getAllSubtopicsAction.rejected.toString()]: isNotFetching,

    [getAllSourcesAction.pending.toString()]: isFetching,
    [getAllSourcesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allResources = response;
      state.isFetching = false;
    },
    [getAllSourcesAction.rejected.toString()]: isNotFetching,

    [submitAnswerAction.pending.toString()]: isFetching,
    [submitAnswerAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      history.back();
      state.isFetching = false;
    },
    [submitAnswerAction.rejected.toString()]: isNotFetching,
  },
});

export const { reducer: problemReducer } = eventSlice;