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


const App = () => {
  const [message, setMessage] = useState(null)
  const [startedTasks, setStartedTasks] = useState([])
  const [waitingTasks, setWaitingTasks] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [clientList, setClientList] = useState([])
  
  useEffect(() => {
    fetchClientsData(user, setClientList);
    fetchWaitingTasksData(user, setWaitingTasks);
    fetchStartedTasksData(user, setStartedTasks);
  }, [user])  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTasksAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
            <Login setUsername={setUsername} setPassword={setPassword} username={username} 
                  password={password} setUser={setUser} setMessage={setMessage}/>
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
    </div>
  )
}

export default App
