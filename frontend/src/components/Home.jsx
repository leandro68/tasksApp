//libraries
import { useSelector } from 'react-redux'
import { isTokenExpired } from '../utils/aux.js'
//components
import Login from '../components/Login'
import StartedTaskList from '../components/StartedTaskList'
import Togglable from '../components/Toggable'

const Home = () => {
    const user = useSelector(state => state.user)
    
    return (
        <>
            {((user === null) || isTokenExpired(user.exp)) ?
                <div>
                <h1>Task App</h1>
                <Togglable buttonLabel='Login' >
                    <Login />
                </Togglable>
                </div>
                
                :
                <div>            
                    <StartedTaskList />

                </div>
            }
        </>
    )
}

export default Home