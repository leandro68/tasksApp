import { createSlice } from '@reduxjs/toolkit'
import taskService from '../services/tasks'
import { setMessage } from './messageReducer'

const waitingTasksSlice = createSlice({
  name: 'waitingTasks',
  initialState: [],
  reducers: {
    setWaitingTasks(state, action) {
      return action.payload;
    }
  }
});

const startedTasksSlice = createSlice({
  name: 'startedTasks',
  initialState: [],
  reducers: {
    setStartedTasks(state, action) {
      return action.payload;
    }
  }
});

const selectedTaskSlice = createSlice({
  name: 'selectedTask',
  initialState: null,
  reducers: {
    setSelectedTask(state, action) {
      return action.payload;
    }
  }
});

export const { setWaitingTasks } = waitingTasksSlice.actions;
export const { setStartedTasks } = startedTasksSlice.actions;
export const { setSelectedTask } = selectedTaskSlice.actions;

export const appendTask = (user, taskObject) => {
  return async dispatch => {
    taskService.setToken(user.token);
    const newTask = await taskService.create(taskObject)
    dispatch(setMessage(`New task created`))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }
}

export const initializeTasks = (user, state) => {
    taskService.setToken(user.token);
    return async dispatch => {
      const taskslist = await taskService.getByState(state)
      switch (state) {
          case "WAITING":
              dispatch(setWaitingTasks(taskslist))
              break
          case "STARTED":
              dispatch(setStartedTasks(taskslist))
              break
      }
  }
}

export const deleteTask = (user, id) => {
    taskService.setToken(user.token);
    return async dispatch => {
        await taskService.erase(id)
        dispatch(setMessage(`Task successfully deleted`))
        setTimeout(() => {
          dispatch(setMessage(null))
        }, 5000)
    }
}

export const updateTask = (user, id, taskObject) => {
    taskService.setToken(user.token);
    return async dispatch => {
      const response = await taskService.update(id, taskObject)
      dispatch(setMessage(`Task successfully updated`))
        setTimeout(() => {
          dispatch(setMessage(null))
        }, 5000)
    }
}

export const waitingTasksReducer = waitingTasksSlice.reducer;
export const startedTasksReducer = startedTasksSlice.reducer;
export const selectedTaskReducer = selectedTaskSlice.reducer;