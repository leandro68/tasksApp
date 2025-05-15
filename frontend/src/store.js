import { configureStore } from '@reduxjs/toolkit'

import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import clientsReducer from './reducers/clientsReducer'
import startedTasksReducer from './reducers/startedTasksReducer'
import waitingTasksReducer from './reducers/waitingTasksReducer'

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    clients: clientsReducer,
    startedTasks: startedTasksReducer,
    waitingTasks: waitingTasksReducer,
    notes: noteReducer,
    filter: filterReducer
  }
})

export default store