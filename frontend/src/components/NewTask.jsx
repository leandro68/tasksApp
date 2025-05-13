import {useState, useEffect} from 'react'
import taskService from '../services/tasks'
import { fetchClientsData, fetchWaitingTasksData } from '../utils/aux.js'

const NewTask = ({setClientList, setMessage, setWaitingTasks, clientList}) => {
    const [taskOrder, setTaskOrder] = useState('')
    const [taskClient, setTaskClient] = useState(clientList.length > 0 ? clientList[0].id : '')
    
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
                setMessage(`new task successfully added`);
                fetchClientsData(setClientList)
                fetchWaitingTasksData(setWaitingTasks)
                setTaskOrder('')
                setTaskClient('')
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            } catch (exception) {
                setMessage('Error al agregar la tarea');
                console.error(exception);
        
                setTimeout(() => {
                    setMessage(null);
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