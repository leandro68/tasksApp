import { createSlice } from '@reduxjs/toolkit'
import clientService from '../services/clients'
import { setMessage } from './messageReducer'

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

export const appendClient = (user, {name, subscriber}) => {
  return async dispatch => {
    clientService.setToken(user.token);
    const newClient = await clientService.create({name, subscriber})
    dispatch(createClient(newClient))
    dispatch(setMessage(`${newClient.name} logged in`))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }
}

export const initializeClients = (user) => {
  return async dispatch => {
    clientService.setToken(user.token);
    const clientslist = await clientService.getAll()
    dispatch(setClients(clientslist))
  }
}


export const { setClients, createClient } = clientsSlice.actions
export default clientsSlice.reducer