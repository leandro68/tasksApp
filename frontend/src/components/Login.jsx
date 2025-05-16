import {useState} from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'
import { initializeUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
          await dispatch(initializeUser({username, password}))
          setUsername('')
          setPassword('')
          navigate('/')
        } catch (exception) {
          dispatch(setMessage('Wrong credentials'))
          console.log(exception)
          setTimeout(() => {
            dispatch(setMessage(null))
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
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}

export default Login