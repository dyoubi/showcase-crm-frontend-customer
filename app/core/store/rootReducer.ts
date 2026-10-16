import { AnyAction, combineReducers } from '@reduxjs/toolkit';

import { metaSlice } from '@/core/store/metaSlice';
import { apiSlice } from '@/core/store/apiSlice';
import { machineViewSlice } from '@/core/domains/machineView';

export const appReducer = combineReducers({
  [metaSlice.name]: metaSlice.reducer,
  [machineViewSlice.name]: machineViewSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootReducer = (state: any, action: AnyAction) => {
  return appReducer(state, action);
};
