import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { type TaskId, type Task } from "../../../types/task.d";

import todoApi from "../../../api/taskManagerApi.ts";
import { extractBackendErrorMessage } from "../../../helpers/manageBackendError.ts";

export interface TaskState {
  activeTask: Task | null;
  tasks: Task[];
  loading: boolean;
  backendErrorMessage: string | null;
}

const initialState: TaskState = {
  activeTask: null,
  tasks: [],
  loading: false,
  backendErrorMessage: null,
};

export const onFetchTasks = createAsyncThunk<Task[], void>(
  "tasks/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await todoApi.get("/tasks/all");
      console.log(data);

      return data.tasks as Task[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const onFetchTaskById = createAsyncThunk<Task, TaskId>(
  "tasks/fetchTaskById",
  async (taskId, thunkAPI) => {
    try {
      const { data } = await todoApi.get(`/tasks/byId/${taskId.id}`);
      return data as Task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const onFetchTasksByUserId = createAsyncThunk<Task[]>(
  "tasks/fetchTasksByUserId",
  async (_, thunkAPI) => {
    try {
      const res = await todoApi.get("/tasks/byUserId");
      return res.data as Task[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const onCreateTask = createAsyncThunk<Task, Partial<Task>>(
  "tasks/create",
  async (newTask, thunkAPI) => {
    try {
      const res = await todoApi.post("/tasks/create", newTask);
      return res.data as Task;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const onUpdateTask = createAsyncThunk<Task, Partial<Task>>(
  "tasks/update",
  async (updatedTask, thunkAPI) => {
    try {
      const res = await todoApi.put(
        `/tasks/update/${updatedTask.id}`,
        updatedTask
      );
      return res.data as Task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const onDeleteTask = createAsyncThunk<string, string>(
  "tasks/delete",
  async (taskId, thunkAPI) => {
    try {
      await todoApi.delete(`/tasks/delete/${taskId}`);
      return taskId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    onAddNewTaskState: (state, { payload }: PayloadAction<Task>) => {
      state.tasks.push(payload);
    },
    onUpdateTaskState: (state, { payload }: PayloadAction<Task>) => {
      state.tasks = state.tasks.map((task) =>
        task.id === payload.id ? payload : task
      );
    },
    onDeleteTaskState: (state, { payload }: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
    },
    onClearBackendErrorMessage: (state) => {
      state.backendErrorMessage = null;
    },
    onResetActiveTask: (state) => {
      state.activeTask = null;
    },
  },
  extraReducers(builder) {
    builder
      // FETCH tasks
      .addCase(onFetchTasks.pending, (state) => {
        state.loading = true;
        state.backendErrorMessage = null;
      })
      .addCase(onFetchTasks.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.loading = false;
      })
      .addCase(onFetchTasks.rejected, (state, { payload }) => {
        state.loading = false;
        state.backendErrorMessage =
          extractBackendErrorMessage(payload) || "Error fetching tasks.";
      })
      // FETCH task by id
      .addCase(onFetchTaskById.pending, (state) => {
        state.loading = true;
        state.backendErrorMessage = null;
      })
      .addCase(onFetchTaskById.fulfilled, (state, { payload }) => {
        // const exists = state.tasks.find(t => t.id === payload.id)
        // if (!exists) state.tasks.push(payload)
        state.activeTask = payload;
        state.loading = false;
      })
      .addCase(onFetchTaskById.rejected, (state, { payload }) => {
        state.loading = false;
        state.backendErrorMessage =
          extractBackendErrorMessage(payload) || "Error fetching tasks.";
      })
      // FETCH tasks by user id
      .addCase(onFetchTasksByUserId.pending, (state) => {
        state.loading = true;
        state.backendErrorMessage = null;
      })
      .addCase(onFetchTasksByUserId.fulfilled, (state, { payload }) => {
        state.tasks = payload;
        state.loading = false;
      })
      .addCase(onFetchTasksByUserId.rejected, (state, { payload }) => {
        state.loading = false;
        state.backendErrorMessage =
          extractBackendErrorMessage(payload) || "Error fetching user tasks.";
      })
      // CREATE
      .addCase(onCreateTask.pending, (state) => {
        state.loading = true;
        state.backendErrorMessage = null;
      })
      .addCase(onCreateTask.fulfilled, (state, { payload }) => {
        state.tasks.push(payload);
        state.loading = false;
      })
      .addCase(onCreateTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.backendErrorMessage =
          extractBackendErrorMessage(payload) || "Error creating task.";
      })
      // UPDATE
      .addCase(onUpdateTask.pending, (state) => {
        state.loading = true;
        state.backendErrorMessage = null;
      })
      .addCase(onUpdateTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.map((t) =>
          t.id === payload.id ? payload : t
        );
        state.loading = false;
      })
      .addCase(onUpdateTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.backendErrorMessage =
          extractBackendErrorMessage(payload) || "Error updating task.";
      })
      // DELETE
      .addCase(onDeleteTask.pending, (state) => {
        state.loading = true;
        state.backendErrorMessage = null;
      })
      .addCase(onDeleteTask.fulfilled, (state, { payload }) => {
        state.tasks = state.tasks.filter((t) => t.id !== payload);
        state.loading = false;
      })
      .addCase(onDeleteTask.rejected, (state, { payload }) => {
        state.loading = false;
        state.backendErrorMessage =
          extractBackendErrorMessage(payload) || "Error deleting task.";
      });
  },
});

export const {
  onAddNewTaskState,
  onUpdateTaskState,
  onDeleteTaskState,
  onClearBackendErrorMessage,
  onResetActiveTask,
} = taskSlice.actions;
