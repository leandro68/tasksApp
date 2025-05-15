import {useState, useEffect} from 'react'
import StartedTaskList from './components/StartedTaskList'
import WaitingTaskList from './components/WaitingTaskList'
import NewTask from './components/NewTask'
import Notification from './components/Notification'
import Client from './components/Client'
import Login from './components/Login'
import Home from './components/Home.jsx'
import OptionsMenu from './components/OptionsMenu'
import taskService from './services/tasks'
import clientService from './services/clients'
import { fetchClientsData, fetchStartedTasksData, fetchWaitingTasksData, isTokenExpired } from './utils/aux.js'
import Togglable from './components/Toggable'

import { setUser } from './reducers/userReducer'
import { setClients } from './reducers/clientsReducer'
import { setStartedTasks } from './reducers/startedTasksReducer'
import { setWaitingTasks } from './reducers/waitingTasksReducer'

import { useDispatch, useSelector } from 'react-redux'

import Notes from './components/Notes.jsx'
import NewNote from './components/NewNote.jsx'
import VisibilityFilter from './components/VisibilityFilter' 

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)


  useEffect(() => {
    
    if (user !== null && !isTokenExpired(user.exp)) {
      console.log('pasada user:',user)
      clientService.setToken(user.token);
      clientService.getAll().then(clients => dispatch(setClients(clients)));
      taskService.setToken(user.token);
      taskService.getByState({ state: 'STARTED' }).then(tasks => dispatch(setStartedTasks(tasks)));
      taskService.getByState({ state: 'WAITING' }).then(tasks => dispatch(setWaitingTasks(tasks)));
    }
    
  }, [user])   

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTasksAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      taskService.setToken(user.token)
    }
  }, []) 

  

  return (
    <div>
      <Notification />
      <Home />
      <Client />
      <NewTask />
      <WaitingTaskList />
      {/* <div>
        <NewNote />
        <VisibilityFilter />
        <Notes />
      </div>  */}
    </div>
  )
}


export default App

