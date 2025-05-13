import {useState} from 'react'
import loginService from '../services/login'
import PropTypes from 'prop-types'
import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const Login = ({setMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    
    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          const userLogged = await loginService.login({
            username, password,
          })
          window.localStorage.setItem(
            'loggedTasksAppUser', JSON.stringify(userLogged)
          ) 
          console.log('userlogged',userLogged)
          dispatch(setUser(userLogged))
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
        <>
            <form onSubmit={handleLogin}>
                <div>
                username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
                </div>
                <div>
                password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
                </div>
                <br/>
                <button className="outOfMenuButton" type="submit">login</button>
            </form>
            <hr/>
        </>
    )
}

Login.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default Login