import { type Task, type TaskId } from "../../types/task.d";

import { useAppDispatch, useAppSelector } from "./reduxStore.ts";
import {
  onAddNewTaskState,
  onClearBackendErrorMessage,
  onCreateTask,
  onDeleteTaskState,
  onFetchTasks,
  onUpdateTask,
  onFetchTasksByUserId,
  onFetchTaskById,
  onResetActiveTask,
} from "./../slices/task/taskSlice.ts";
import { handleAsyncActionWithToast } from "../../helpers/handleAsyncActionWithToast.ts";

export const useTaskActions = () => {
  const dispatch = useAppDispatch();
  const { activeTask, tasks, backendErrorMessage, loading } = useAppSelector(
    (state) => state.task
  );

  const fetchTasks = async () => {
    try {
      await dispatch(onFetchTasks()).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTaskById = async ({ id }: TaskId) => {
    try {
      await dispatch(onFetchTaskById({ id })).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const resetActiveTask = () => {
    dispatch(onResetActiveTask());
  };

  const fetchTasksByUserId = async () => {
    try {
      await dispatch(onFetchTasksByUserId()).unwrap();
    } catch (error) {
      console.error(error);
    }
  };

  const saveTask = async (
    task: Partial<Task>
  ): Promise<{ wasSuccessful: boolean; resultData: Task | undefined }> => {
    const isUpdating = !!task.id;
    return await handleAsyncActionWithToast<Task>(
      dispatch,
      async () => {
        if (isUpdating) {
          return await dispatch(onUpdateTask(task)).unwrap();
        } else {
          return await dispatch(onCreateTask(task)).unwrap();
        }
      },
      {
        loading: isUpdating ? "Updating task..." : "Saving task...",
        success: isUpdating ? "Task updated." : "Task created.",
        error: "Error saving task.",
      },
      onClearBackendErrorMessage
    );
  };

  const deleteTask = async (task: Task) => {
    try {
      console.log(task);
      // TODO::: delete task
      // await dispatch(onDeleteTask(task)).unwrap()
    } catch (error) {
      console.error(error);
    }
  };

  const saveTaskState = (task: Task) => {
    try {
      if (task.id) {
        // TODO::: update task
        // dispatch(onUpdateTask(category))
      } else {
        dispatch(onAddNewTaskState(task));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTaskState = (task: Task) => {
    try {
      dispatch(onDeleteTaskState(task));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    //* Properties
    activeTask,
    tasks,
    loading,
    backendErrorMessage,
    //* Methods
    // THUNKS
    fetchTasks,
    fetchTaskById,
    fetchTasksByUserId,
    saveTask,
    deleteTask,
    // STATE
    saveTaskState,
    deleteTaskState,
    resetActiveTask,
    onClearBackendErrorMessage,
  };
};
