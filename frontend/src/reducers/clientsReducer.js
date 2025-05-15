import { createSlice } from '@reduxjs/toolkit'

const clientsSlice = createSlice({
  name: 'clients',
  initialState: [],
  reducers: {
    createClient(state, action) {
      const name = action.payload.name
      const subscriber = action.payload.subscriber
      state.push({
        name,
        subscriber,
      })
    },
    setClients(state, action) {
        return action.payload
    }
  },
})


export const { setClients, createClient } = clientsSlice.actions
export default clientsSlice.reducer