import { createSlice } from '@reduxjs/toolkit'

const waitingTasksSlice = createSlice({
  name: 'waitingTasks',
  initialState: [],
  reducers: {
    setWaitingTasks(state, action) {
        return action.payload
    }
  },
})


export const { setWaitingTasks } = waitingTasksSlice.actions
export default waitingTasksSlice.reducer