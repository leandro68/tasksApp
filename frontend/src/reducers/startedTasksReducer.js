import { createSlice } from '@reduxjs/toolkit'

const startedTasksSlice = createSlice({
  name: 'startedTasks',
  initialState: [],
  reducers: {
    setStartedTasks(state, action) {
        return action.payload
    }
  },
})


export const { setStartedTasks } = startedTasksSlice.actions
export default startedTasksSlice.reducer