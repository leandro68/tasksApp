import { configureStore } from '@reduxjs/toolkit'


import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import clientsReducer from './reducers/clientsReducer'
import { startedTasksReducer, waitingTasksReducer } from './reducers/tasksReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    clients: clientsReducer,
    startedTasks: startedTasksReducer,
    waitingTasks: waitingTasksReducer
  }
})

export default store