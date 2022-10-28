import { createSlice } from '@reduxjs/toolkit';

import { Apis } from '../apis';
import { createAsyncThunkApi } from '../apis/cerateApiAsyncThunk';
import {
  createAccountUrl,
  loginUrl,
  refreshTokenUrl,
} from '../constants/urls';

const initialState = {
  token: null,
  refresh: null,
  user: {},
};

export const refreshTokenAction = createAsyncThunkApi(
  'account/refreshTokenAction',
  Apis.POST,
  refreshTokenUrl,
  {
    defaultNotification: {
      error: 'ایرادی در تازه‌سازی توکن وجود داشت.',
    },
  }
);

export const loginAction = createAsyncThunkApi(
  'account/loginAction',
  Apis.POST,
  loginUrl,
  {
    defaultNotification: {
      success: 'دوباره سلام!',
      error: 'نام کاربری یا رمز عبور اشتباه است!',
    },
  }
);


export const createAccountAction = createAsyncThunkApi(
  'account/createAccountAction',
  Apis.POST,
  createAccountUrl,
  {
    defaultNotification: {
      success: 'حساب کاربری با موفقیت ساخته شد.',
      error: 'مشکلی در ایجاد حساب کاربری وجود دارد.',
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
  name: 'account',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: {
    [loginAction.pending.toString()]: isFetching,
    [loginAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.token = response.access;
      state.refresh = response.refresh;
      state.isFetching = false;
    },
    [loginAction.rejected.toString()]: isNotFetching,

    [createAccountAction.pending.toString()]: isFetching,
    [createAccountAction.fulfilled.toString()]: isNotFetching,
    [createAccountAction.rejected.toString()]: isNotFetching,

    [refreshTokenAction.pending.toString()]: isFetching,
    [refreshTokenAction.fulfilled.toString()]: (state, { payload: { response } }) => {
      state.token = response.access;
      state.refresh = response.refresh;
      state.isFetching = false;
    },
    [refreshTokenAction.rejected.toString()]: isNotFetching,

  },
});

export const { logout: logoutAction } = accountSlice.actions;

export const { reducer: accountReducer } = accountSlice;
