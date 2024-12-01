import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../../types/tasks.ts";

type TaskState = {
  tasks: Task[];
  filter: string;
};

const initialState: TaskState = {
  tasks: [],
  filter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state: TaskState, { payload: title }: PayloadAction<string>) => {
      state.tasks.push({
        id: new Date().getTime(),
        title,
        completed: false,
      });
    },
    deleteTask: (state: TaskState, { payload: id }: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },

    favoriteTask: (
      state: TaskState,
      { payload: id }: PayloadAction<number>,
    ) => {
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex !== -1) {
        state.tasks[taskIndex].completed = true;
      }
    },

    filterTask: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addTask, deleteTask, favoriteTask, filterTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;
