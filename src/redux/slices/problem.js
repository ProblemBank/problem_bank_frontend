import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  problemCRUDUrl,
  // answerCorrectionUrl,
  // playerProblemUrl,
  // playerUrl,
  // scoreboardUrl,
  // subjectUrl,
} from '../constants/urls';

// export const getPlayerAction = createAsyncThunkApi(
//   'account/getProfileInfoAction',
//   Apis.GET,
//   playerUrl,
// );

// export const getAllPlayerProblemsAction = createAsyncThunkApi(
//   'events/getAllPlayerProblemsAction',
//   Apis.GET,
//   playerProblemUrl,
// );

// export const getOnePlayerProblemAction = createAsyncThunkApi(
//   'events/getOnePlayerProblemAction',
//   Apis.GET,
//   playerProblemUrl,
// );


// export const getAllGameSubjectsAction = createAsyncThunkApi(
//   'events/getAllGameSubjectsAction',
//   Apis.GET,
//   subjectUrl,
// );

// export const buyRandomProblemAction = createAsyncThunkApi(
//   'events/buyRandomProblemAction',
//   Apis.POST,
//   playerProblemUrl,
//   {
//     defaultNotification: {
//       success: 'مسئله با موفقیت دریافت شد!',
//       error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
//     },
//   }
// );

// export const answerProblemAction = createAsyncThunkApi(
//   'events/answerProblemAction',
//   Apis.POST_FORM_DATA,
//   playerProblemUrl,
//   {
//     defaultNotification: {
//       success: 'پاسخ مسئله با موفقیت ثبت شد!',
//       error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
//     },
//   }
// );


// export const setAnswerMarkAction = createAsyncThunkApi(
//   'events/setAnswerMarkAction',
//   Apis.POST,
//   answerCorrectionUrl,
//   {
//     defaultNotification: {
//       success: 'نمره‌ی شما با موفقیت ثبت شد!',
//       error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
//     },
//   }
// );

// export const getOneAnswerForCorrectionAction = createAsyncThunkApi(
//   'events/getOneAnswerForCorrectionAction',
//   Apis.POST,
//   answerCorrectionUrl,
// );

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
  'events/addProblemAction',
  Apis.PATCH,
  problemCRUDUrl,
  {
    defaultNotification: {
      success: 'مسئله با موفقیت اضافه شد!',
      error: 'مشکلی وجود داشت. دوباره تلاش کنید.',
    },
  }
);

// export const getScoreboardAction = createAsyncThunkApi(
//   'events/getScoreboardAction',
//   Apis.GET,
//   scoreboardUrl,
// );


const initialState = {
  isFetching: false,
  allGameSubjects: [],
  allPlayerProblems: [],
  players: [],
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

    // [getPlayerAction.pending.toString()]: isFetching,
    // [getPlayerAction.fulfilled.toString()]: (state, { payload: { response } }) => {
    //   state.player = response;
    //   state.isFetching = false;
    // },
    // [getPlayerAction.rejected.toString()]: isNotFetching,


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