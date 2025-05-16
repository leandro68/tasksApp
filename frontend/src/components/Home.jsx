//libraries
import { useSelector } from 'react-redux'
import { isTokenExpired } from '../utils/aux.js'
//components
import StartedTaskList from '../components/StartedTaskList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeClients } from '../reducers/clientsReducer'
import { initializeTasks } from '../reducers/tasksReducer'

const Home = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
    if (user !== null && !isTokenExpired(user.exp)) {
        dispatch(initializeClients(user))
        dispatch(initializeTasks(user,'STARTED'))
        dispatch(initializeTasks(user,'WAITING'))
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