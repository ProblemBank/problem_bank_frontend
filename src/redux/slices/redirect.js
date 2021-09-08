import { createSlice } from '@reduxjs/toolkit';

const initialState = { redirectTo: null, force: false };
import { addProblemToGroupAction } from './problem';

const redirectSlice = createSlice({
  name: 'redirect',
  initialState,
  reducers: {
    initRedirect: () => initialState,
  },
  extraReducers: {
    // [addProblemToGroupAction.fulfilled.toString()]: (state, action) => {
    //   state.redirectTo = `/event/${action.meta.arg.eventId}/`
    // },
  },
});

export const { initRedirect: initRedirectAction } = redirectSlice.actions;

export const { reducer: redirectReducer } = redirectSlice;
