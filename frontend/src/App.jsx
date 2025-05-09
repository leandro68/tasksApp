import {useState, useEffect} from 'react'
import StartedTaskList from './components/StartedTaskList'
import WaitingTaskList from './components/WaitingTaskList'
import NewTask from './components/NewTask'
import Notification from './components/Notification'
import Client from './components/Client'
import Login from './components/Login'
import OptionsMenu from './components/OptionsMenu'
import taskService from './services/tasks'
import loginService from './services/login'
import clientService from './services/clients'
import { fetchUserData, isTokenExpired } from './utils/aux.js'
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
    fetchUserData(user, setWaitingTasks, setStartedTasks, setClientList);

    /* if ((user !== null) && !isTokenExpired(user.exp)) {   
      taskService.setToken(user.token)
      let state='WAITING'
      taskService.getByState({state}).then(tasks => setWaitingTasks(tasks))
      state='STARTED'
      taskService.getByState({state}).then(tasks => setStartedTasks(tasks))
      clientService.setToken(user.token)
      clientService.getAll().then(clients => setClientList(clients))
    }  */
  }, [user])  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedTasksAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      taskService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const userLogged = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedTasksAppUser', JSON.stringify(userLogged)
      ) 
      setUser(userLogged)
      setUsername('')
      setPassword('')
      
      setMessage(`${userLogged.name} logged in`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      console.log(exception)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  


  return (
    <div>
      <Notification message={message}/>
      {((user === null) || isTokenExpired(user.exp)) ?
        <div>
          <h1>Task App</h1>
          <Togglable buttonLabel='Login'>
            <Login handleLogin={handleLogin} setUsername={setUsername} setPassword={setPassword} username={username} password={password} />
          </Togglable>
        </div>
        
           :
        <div>
          <OptionsMenu setuser={setUser} setmessage={setMessage}/>
          <Client clients={clientList} setclientlist={setClientList} setMessage={setMessage}/>
          <NewTask clientList={clientList} setMessage={setMessage} setWaitingTasks={setWaitingTasks} setStartedTasks={setStartedTasks} user={user} setClientList={setClientList}/>
          <StartedTaskList taskList={startedTasks} setMessage={setMessage} />
          <WaitingTaskList taskList={waitingTasks} setMessage={setMessage} user={user} setWaitingTasks={setWaitingTasks} setStartedTasks={setStartedTasks} setClientList={setClientList}/>
        </div>
      }
    </div>
  )
}

export default App
