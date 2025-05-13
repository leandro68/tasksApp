import {useState, useEffect} from 'react'
import StartedTaskList from './components/StartedTaskList'
import WaitingTaskList from './components/WaitingTaskList'
import NewTask from './components/NewTask'
import Notification from './components/Notification'
import Client from './components/Client'
import Login from './components/Login'
import OptionsMenu from './components/OptionsMenu'
import taskService from './services/tasks'
import { fetchClientsData, fetchStartedTasksData, fetchWaitingTasksData, isTokenExpired } from './utils/aux.js'
import Togglable from './components/Toggable'

import { setUser } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import Notes from './components/Notes.jsx'
import NewNote from './components/NewNote.jsx'
import VisibilityFilter from './components/VisibilityFilter' 

const App = () => {
  const [message, setMessage] = useState(null)
  const [startedTasks, setStartedTasks] = useState([])
  const [waitingTasks, setWaitingTasks] = useState([])
  const [clientList, setClientList] = useState([])

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    fetchClientsData(user,setClientList);
    fetchWaitingTasksData(user,setWaitingTasks);
    fetchStartedTasksData(user,setStartedTasks);
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
      <Notification message={message}/>
      {((user === null) || isTokenExpired(user.exp)) ?
        <div>
          <h1>Task App</h1>
          <Togglable buttonLabel='Login' >
            <Login setMessage={setMessage}/>
          </Togglable>
        </div>
        
           :
        <div>
          <OptionsMenu setuser={setUser} setmessage={setMessage}/>
          <Client clients={clientList} setclientlist={setClientList} setMessage={setMessage}/>
          <NewTask clientList={clientList} setMessage={setMessage} setWaitingTasks={setWaitingTasks} setStartedTasks={setStartedTasks} user={user} setClientList={setClientList}/>
          <StartedTaskList taskList={startedTasks} setMessage={setMessage} user={user} setWaitingTasks={setWaitingTasks} setStartedTasks={setStartedTasks} setClientList={setClientList}/>
          <WaitingTaskList taskList={waitingTasks} setMessage={setMessage} user={user} setWaitingTasks={setWaitingTasks} setStartedTasks={setStartedTasks} setClientList={setClientList}/>
        </div>
      }
      <div>
        <NewNote />
        <VisibilityFilter />
        <Notes />
      </div> 
    </div>
  )
}


export default App

