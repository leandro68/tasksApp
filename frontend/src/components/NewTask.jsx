import {useState, useEffect} from 'react'
import { setMessage } from '../reducers/messageReducer'
import { initializeTasks, appendTask } from '../reducers/tasksReducer'
import { initializeClients } from '../reducers/clientsReducer'
import { useDispatch, useSelector } from 'react-redux'

const NewTask = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const clients = useSelector(state => state.clients)
    const [taskOrder, setTaskOrder] = useState('')
    const [taskClient, setTaskClient] = useState(clients.length > 0 ? clients[0].id : '')
    
    
    useEffect(() => {
        if (clients.length > 0) {
            setTaskClient(clients[0].id);
        }
    }, [clients]);

    const handleSaveTask = async (event) => {
            event.preventDefault()
            
            const taskObject = {
                  order: taskOrder,
                  inputDate: Date.now(),
                  clientId: taskClient
            }
            console.log('taskObject:',taskObject)
                     
            try {
                await dispatch(appendTask(user, taskObject))
                await dispatch(initializeClients(user))
                await dispatch(initializeTasks(user, 'WAITING'))
                setTaskOrder('')
                setTaskClient('')
            } catch (exception) {
                dispatch(setMessage('Error al agregar la tarea'))
                console.error(exception);
        
                setTimeout(() => {
                    dispatch(setMessage(null))
                }, 5000);
            }
        }
    return (
        <div>
           <h2>New Task</h2>
            <form onSubmit={handleSaveTask}>
                <div>
                    <label>order: </label>
                    <input type="text" 
                           placeholder="descripción de la tarea"
                           value={taskOrder}
                           onChange={({ target }) => setTaskOrder(target.value)}/>
                    <label>cliente: </label>
                    <select value={taskClient} onChange={({ target }) => setTaskClient(target.value)}>
                        {clients.map((option, index) => (
                            <option key={index} value={option.id}>{option.name}</option>
                        ))}
                    </select>
                </div>
                <button className="outOfMenuButton" type="submit">save task</button>
            </form>  
            <hr/>
        </div>
    )
}

export default NewTask