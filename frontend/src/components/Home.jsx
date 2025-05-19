//libraries
import { useSelector } from 'react-redux'
import { isTokenExpired } from '../utils/aux.js'
//components
import StartedTaskList from '../components/StartedTaskList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeClients } from '../reducers/clientsReducer'
import { initializeTasks } from '../reducers/tasksReducer'
import { setUser } from '../reducers/userReducer.js'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
    if (user !== null && !isTokenExpired(user.exp)) {
        dispatch(initializeClients(user))
        dispatch(initializeTasks(user,'STARTED'))
        dispatch(initializeTasks(user,'WAITING'))
    }
    if (user && isTokenExpired(user.exp)) {
        localStorage.removeItem('loggedTasksAppUser')
        dispatch(setUser(null))
        navigate('/') // Redirigir al usuario a login después de cerrar sesión
    }   
    }, []) 

    return (
        <>
            {((user === null) || isTokenExpired(user.exp)) ?
                <div>
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