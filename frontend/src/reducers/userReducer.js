import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setMessage } from './messageReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  },
})

export const initializeUser = ({username, password}) => {
  return async dispatch => {
    const userLogged = await loginService.login({username, password})
    dispatch(setUser(userLogged))
    window.localStorage.setItem(
            'loggedTasksAppUser', JSON.stringify(userLogged)
          ) 
    dispatch(setMessage(`${userLogged.name} logged in`))
    setTimeout(() => {
      dispatch(setMessage(null))
    }, 5000)
  }
}


export const { setUser } = userSlice.actions
export default userSlice.reducer