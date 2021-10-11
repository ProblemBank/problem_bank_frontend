import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorHandler } from './errorHandler';

export const createAsyncThunkApi = (typePrefix, api, url, options) =>
  createAsyncThunk(typePrefix, async (arg, { rejectWithValue, dispatch, getState }) => {
    console.log("@@@@@@@@@@@")
    try {
      console.log(arg)

      const body = options?.bodyCreator?.(arg) || arg;
      console.log(body)

      const stringUrl = typeof url === 'function' ? url(arg) : url;

      console.log(stringUrl);

      const response = await api(stringUrl, body);

      console.log("##########")

      if (options?.onSuccessAction) {
        dispatch(options?.onSuccessAction({ response, arg }));
      }

      return {
        response,
        ...(options?.defaultNotification?.success
          ? { message: options.defaultNotification.success }
          : {}),
      };
    } catch (error) {
      if (getState().Intl.locale == 'fa') {
        console.log(error)
        return errorHandler(
          error,
          dispatch,
          rejectWithValue,
          options?.defaultNotification?.error,
          options?.defaultNotification?.showHttpError || false
        );
      }
    }
  });
