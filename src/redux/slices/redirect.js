import { createSlice } from '@reduxjs/toolkit';
import { removeProblemAction } from './problem';

const initialState = { redirectTo: null, force: false };

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    initRedirect: () => initialState,
  },
  extraReducers: {
    // [removeProblemAction.fulfilled.toString()]: (state, action) => {
    //   console.log(action);
    //   state.redirectTo = `/event/${action.meta.arg.eventId}/`
    // },
  },
});

export const { initRedirect: initRedirectAction } = redirectSlice.actions;

export const { reducer: redirectReducer } = redirectSlice;
