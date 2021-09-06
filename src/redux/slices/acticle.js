import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  articlesUrl,
  getProblemsUrl,
  getSubmissionsUrl,
  getUnreadNotificationsUrl,
  helpUrl,
  markSubmissionUrl,
  statesCRUDUrl,
  visitWorkshopPlayerUrl,
  widgetCRUDUrl,
  workshopCRUDUrl,
  workshopTeamsUrl,
} from '../constants/urls';

const initialState = {
  workshops: [],
  articles: [],
  teams: {},
  notifications: [],
  problems: [],
  submissions: [],
  submissionsIsLoading: false,
};

export { initialState as mentorInitialState };

export const getArticlesAction = createAsyncThunkApi(
  'articles/getAll',
  Apis.GET,
  articlesUrl
);

export const getArticleAction = createAsyncThunkApi(
  'articles/getOne',
  Apis.GET,
  ({ articleId }) => articlesUrl + articleId + '/'
);

export const createArticleAction = createAsyncThunkApi(
  'articles/create',
  Apis.POST,
  articlesUrl
);











const isFetching = (state) => {
  state.isFetching = true;
};

const isNotFetching = (state) => {
  state.isFetching = false;
};

const mentorSlice = createSlice({
  name: 'mentor',
  initialState,
  reducers: {},
  extraReducers: {
    [getArticlesAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.articles = response;
    },

    [getArticleAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.articles = state.articles.filter(
        (article) => +article.id !== +response.id
      );
      state.articles.push(response);
    },
  },
});

export const { reducer: articleReducer } = mentorSlice;
