import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
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
      success: 'مسئله با موفقیت اضافه شد!',
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
    [editProblemAction.fulfilled.toString()]: isNotFetching,
    [editProblemAction.rejected.toString()]: isNotFetching,

    [addProblemAction.pending.toString()]: isFetching,
    [addProblemAction.fulfilled.toString()]: isNotFetching,
    [addProblemAction.rejected.toString()]: isNotFetching,


    // [getAllGameSubjectsAction.pending.toString()]: isFetching,
    // [getAllGameSubjectsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.allGameSubjects = response;
    //   state.isFetching = false;
    // },
    // [getAllGameSubjectsAction.rejected.toString()]: isNotFetching,


    // [getAllPlayerProblemsAction.pending.toString()]: isFetching,
    // [getAllPlayerProblemsAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.allPlayerProblems = response;
    //   state.isFetching = false;
    // },
    // [getAllPlayerProblemsAction.rejected.toString()]: isNotFetching,

    // [buyRandomProblemAction.pending.toString()]: isFetching,
    // [buyRandomProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   const allPlayerProblems = [...state.allPlayerProblems, response]
    //   state.allPlayerProblems = allPlayerProblems;
    //   state.isFetching = false;
    // },
    // [buyRandomProblemAction.rejected.toString()]: isNotFetching,


    // [answerProblemAction.pending.toString()]: isFetching,
    // [answerProblemAction.fulfilled.toString()]: isNotFetching,
    // [answerProblemAction.rejected.toString()]: isNotFetching,


    // [getOnePlayerProblemAction.pending.toString()]: isFetching,
    // [getOnePlayerProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.playerProblem = response;
    //   state.isFetching = false;
    // },
    // [getOnePlayerProblemAction.rejected.toString()]: isNotFetching,


    // [getOneAnswerForCorrectionAction.pending.toString()]: isFetching,
    // [getOneAnswerForCorrectionAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.playerAnswer = response;
    //   state.isFetching = false;
    // },
    // [getOneAnswerForCorrectionAction.rejected.toString()]: isNotFetching,


    [addProblemAction.pending.toString()]: isFetching,
    [addProblemAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.isFetching = false;
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    },
    [addProblemAction.rejected.toString()]: isNotFetching,


    // [getScoreboardAction.pending.toString()]: isFetching,
    // [getScoreboardAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.isFetching = false;
    //   state.players = response;
    // },
    // [getScoreboardAction.rejected.toString()]: isNotFetching,

  },
});

export const { reducer: problemReducer } = eventSlice;