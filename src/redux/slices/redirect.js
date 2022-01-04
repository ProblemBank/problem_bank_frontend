import { createSlice } from '@reduxjs/toolkit';

const initialState = { redirectTo: null, force: false };
import { removeProblemAction } from './problem';

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
