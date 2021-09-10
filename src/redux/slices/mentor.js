import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  getOneSubmittedProblemUrl,
  getAllSubmittedProblemsUrl,
  judgeOneSubmittedProblemUrl,
} from '../constants/urls';

const initialState = {
  isFetching: false,
  allSubmittedProblems: [],
};

export const getAllSubmittedProblemsAction = createAsyncThunkApi(
  'mentor/getAllSubmittedProblemsAction',
  Apis.GET,
  getAllSubmittedProblemsUrl,
);

export const getOneSubmittedProblemAction = createAsyncThunkApi(
  'mentor/getOneSubmittedProblemAction',
  Apis.GET,
  getOneSubmittedProblemUrl,
);

export const judgeOneSubmittedProblemAction = createAsyncThunkApi(
  'mentor/judgeOneSubmittedProblemAction',
  Apis.POST,
  judgeOneSubmittedProblemUrl,
  {
    defaultNotification: {
      success: 'پاسخ بنده‌خدا با موفقیت ثبت شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);


const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const accountSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getAllSubmittedProblemsAction.pending.toString()]: isFetching,
    [getAllSubmittedProblemsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.allSubmittedProblems = response;
      state.isFetching = false;
    },
    [getAllSubmittedProblemsAction.rejected.toString()]: isNotFetching,

    [getOneSubmittedProblemAction.pending.toString()]: isFetching,
    [getOneSubmittedProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.answer = response;
      state.isFetching = false;
    },
    [getOneSubmittedProblemAction.rejected.toString()]: isNotFetching,


  },
});


export const { reducer: mentorReducer } = accountSlice;
