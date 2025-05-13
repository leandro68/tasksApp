import { setUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setMessage } from '../reducers/messageReducer'

const OptionsMenu = () => {

    const dispatch = useDispatch()
    
    const handleLogout = () => {
        window.localStorage.removeItem('loggedTasksAppUser')
        dispatch(setMessage('User logout successfully'))
        dispatch(setUser(null))
        setTimeout(() => {
            dispatch(setMessage(null))
        }, 5000)
    }

    return (
        <div>
            <button className="menuButton" onClick={handleLogout}>Logout</button>
            <button className="menuButton" onClick={handleLogout}>New Task</button>
            <button className="menuButton" onClick={handleLogout}>New Client</button>
            <hr/>
        </div>
        
    )
}

export default OptionsMenu