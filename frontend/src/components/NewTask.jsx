import {useState, useEffect} from 'react'
import taskService from '../services/tasks'
import { fetchClientsData, fetchWaitingTasksData } from '../utils/aux.js'
import { setMessage } from '../reducers/messageReducer'
import { useDispatch, useSelector } from 'react-redux'

const NewTask = ({setClientList, setWaitingTasks, clientList}) => {
    const [taskOrder, setTaskOrder] = useState('')
    const [taskClient, setTaskClient] = useState(clientList.length > 0 ? clientList[0].id : '')

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    
    useEffect(() => {
        if (clientList.length > 0) {
            setTaskClient(clientList[0].id);
        }
    }, [clientList]);

    const handleSaveTask = async (event) => {
            event.preventDefault()
            
            const taskObject = {
                  order: taskOrder,
                  inputDate: Date.now(),
                  clientId: taskClient
            }
            console.log('taskObject:',taskObject)
                     
            try {
                const returnedTask = await taskService.create(taskObject);
                //setclientlist(clients.concat(returnedClient.name));
                
                //console.log('returned task',returnedTask)
                dispatch(setMessage(`new task successfully added`))
                fetchClientsData(user, setClientList)
                fetchWaitingTasksData(user, setWaitingTasks)
                setTaskOrder('')
                setTaskClient('')
                setTimeout(() => {
                    dispatch(setMessage(null))
                }, 5000);
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
                        {clientList.map((option, index) => (
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