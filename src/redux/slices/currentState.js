import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import { getScoresUrl, mentorGetCurrentStateUrl } from '../constants/urls';
import {
  getArticleAction,
  getArticlesAction,
} from './acticle';
import {
  createHelpAction,
  createWidgetAction,
  deleteWidgetAction,
  getStateAction,
} from './widget';

export const mentorGetCurrentStateAction = createAsyncThunkApi(
  'currentState/mentorGetCurrentState',
  Apis.POST,
  mentorGetCurrentStateUrl,
  {
    bodyCreator: ({ stateId, playerUUID }) => ({
      state: stateId,
      player_uuid: playerUUID,
    }),
  }
);

export const getScoresAction = createAsyncThunkApi(
  'player/getScore',
  Apis.POST,
  getScoresUrl,
  {
    bodyCreator: ({ fsmId, playerId }) => ({ fsm: fsmId, player: playerId }),
  }
);

const stateNeedUpdate = (state) => {
  state.needUpdateState = true;
};

const stateDontNeedUpdate = (state) => {
  state.needUpdateState = false;
};

const getNewState = (state, { payload: { response } }) => {
  state.needUpdateState = false;
  state.state = response;
};

const sentAnswer = (state, { payload: { response } }) => {
  state.state.widgets = state.state.widgets.map((widget) =>
    +widget.id === +response.problem
      ? {
        ...widget,
        last_submit: response.xanswer,
        answer: response.answer,
      }
      : widget
  );
};

const currentStateSlice = createSlice({
  name: 'currentState',
  initialState: {
    state: {
      widgets: [],
      help_states: [],
    },
    scores: [],
    totalScore: 0,
  },
  extraReducers: {
    [createHelpAction.fulfilled.toString()]: stateNeedUpdate,
    [createWidgetAction.fulfilled.toString()]: stateNeedUpdate,
    [deleteWidgetAction.fulfilled.toString()]: stateNeedUpdate,

    [getArticleAction.fulfilled.toString()]: stateDontNeedUpdate,
    [getArticlesAction.fulfilled.toString()]: stateDontNeedUpdate,

    [mentorGetCurrentStateAction.fulfilled.toString()]: getNewState,
    [getStateAction.fulfilled.toString()]: getNewState,

    [getScoresAction.fulfilled.toString()]: (
      state,
      { payload: { response } }
    ) => {
      state.scores = response.score_transactions;
      state.totalScore = response.scores_sum;
    },
  },
});

export const { initCurrentState: initCurrentStateAction } =
  currentStateSlice.actions;

export const { reducer: currentStateReducer } = currentStateSlice;
