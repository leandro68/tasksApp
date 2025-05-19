import {useEffect} from 'react'
import WaitingTaskList from './components/WaitingTaskList'
import NewTask from './components/NewTask'
import Notification from './components/Notification'
import Client from './components/Client'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Logout from './components/Logout.jsx'
import TaskDetails from './components/TaskDetails'
import taskService from './services/tasks'
import { isTokenExpired } from './utils/aux.js'

import { setUser } from './reducers/userReducer'
import { initializeClients } from './reducers/clientsReducer'
import { initializeTasks } from './reducers/tasksReducer'

import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useMatch} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const startedTasks = useSelector(state => state.startedTasks)
  const match = useMatch('/tasks/:id')
  
  const padding = {
    padding: 5
  }

  /* useEffect(() => {
    
    if (user !== null && !isTokenExpired(user.exp)) {
      dispatch(initializeClients(user))
      dispatch(initializeTasks(user,'STARTED'))
      dispatch(initializeTasks(user,'WAITING'))
    }
    
  }, [user])    */

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTasksAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      //taskService.setToken(user.token)
    }
  }, []) 

  
  const task = match 
    ? startedTasks.find(task => task.id === match.params.id)
    : null


  return (
    <div>
      <div style={{ padding: 10 }}>
        {user ?
        <>
          <Link style={padding} to="/">Home</Link>
          <Link style={padding} to="/clients">Clients</Link>
          <Link style={padding} to="/newtask">New Task</Link>
          <Link style={padding} to="/waitingtasks">Waiting Tasks</Link>
          <Link style={padding} to="/logout">Logout</Link>
          <em>{user.name} logged in</em>
        </>
        : 
          <Link style={padding} to="/login">login</Link>
        }
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clients" element={<Client />} />
        <Route path="/newtask" element={<NewTask />} />
        <Route path="/waitingtasks" element={<WaitingTaskList />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  )
}


export default App

