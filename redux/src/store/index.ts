import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasksSlice.ts";

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;