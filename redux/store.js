import { configureStore } from '@reduxjs/toolkit';
import { apiCore } from './apiCore';
import generalReducer from './generalSlice'


export const store = configureStore({
  reducer: {
    [apiCore.reducerPath] : apiCore.reducer,
    general: generalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiCore.middleware),
})

