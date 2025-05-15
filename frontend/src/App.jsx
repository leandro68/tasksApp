import {useEffect} from 'react'
import WaitingTaskList from './components/WaitingTaskList'
import NewTask from './components/NewTask'
import Notification from './components/Notification'
import Client from './components/Client'
import Home from './components/Home.jsx'
import taskService from './services/tasks'
import { isTokenExpired } from './utils/aux.js'

import { setUser } from './reducers/userReducer'
import { initializeClients } from './reducers/clientsReducer'
import { initializeTasks } from './reducers/tasksReducer'

import { useDispatch, useSelector } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    
    if (user !== null && !isTokenExpired(user.exp)) {
      console.log('pasada user:',user)
      dispatch(initializeClients(user))
      dispatch(initializeTasks(user,'STARTED'))
      dispatch(initializeTasks(user,'WAITING'))
    }
    
  }, [user])   

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTasksAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      //taskService.setToken(user.token)
    }
  }, []) 

  

  return (
    <div>
      <Notification />
      <Home />
      <Client />
      <NewTask />
      <WaitingTaskList />
    </div>
  )
}


export default App

