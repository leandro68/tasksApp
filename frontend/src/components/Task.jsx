/**
 * Componente Task 
 * Muestra los detalles de una tarea creada
 * primero muestra la lista de tareas comenzadas y luego las tareas en espera
 * si estan en espera permite comenzarlas cambiando el state a REMOTE
 *        en cuyo caso guarda la fecha y hora actual en startedDate ya que se inicia la tarea
 * o cambiandolo a ON PREMISE, 
 *        en cuyo caso guarda la fecha y hora actual en goTrip ya que se inicia el viaje
 */
//import { fetchUserData, isTokenExpired } from './utils/aux.js'
import taskService from '../services/tasks'
import { useDispatch, useSelector } from 'react-redux'
import { setStartedTasks, setWaitingTasks } from '../reducers/tasksReducer';
import { Link } from 'react-router-dom'


import { updateTask, deleteTask } from '../reducers/tasksReducer'
import { setMessage } from '../reducers/messageReducer'
import { initializeTasks } from '../reducers/tasksReducer'

const Task = ({task}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    
    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit' });
    };

    //console.log('Task to modify:',task)
    const handleStart= async (event) => {
        event.preventDefault()
        const taskObject = {
            inputDate: task.inputDate,
            userId: task.user.id,
            clientId: task.client.id,
            endWork: task.endWork,
            backTrip: task.backTrip,
            order: task.order, 
            report: task.report,
            transport: task.transport,
            tripCost: task.tripCost,
            state: 'STARTED'
        }
        switch (event.target.value){
            case 'REMOTE':
                {
                    taskObject.category = 'REMOTE'
                    taskObject.startWork = Date.now()
                    taskObject.goTrip = task.goTrip
                    break
                }
            case 'ON PREMISE':
                {
                    taskObject.category = 'ON PREMISE'
                    taskObject.startWork = task.startWork
                    taskObject.goTrip = Date.now()
                    break
                }
            case 'LOGISTIC':
                {
                    taskObject.category = 'LOGISTIC'
                    taskObject.startWork = task.startWork
                    taskObject.goTrip = Date.now()
                    break
                } 
        }
        
        try {
            const id= task.id
            await dispatch(updateTask(user, id, taskObject))
            //console.log('returnedTask',returnedTask)
            //dispatch(initializeClients(user))
            await dispatch(initializeTasks(user, 'STARTED'))
            await dispatch(initializeTasks(user, 'WAITING'))
        } catch (exception) {
            dispatch(setMessage('Error al modificar el estado de la tarea'))
            console.error(exception);
    
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000);
        }
            
    }

    const handleDelete = async () => {
        let confirmation = confirm("¿Estás seguro de que quieres borrar esta tarea?");
        if (confirmation) {
            //console.log("Elemento borrado.");
            try {
                const id= task.id
                await dispatch(deleteTask(user, id))
                //dispatch(initializeClients(user))
                await dispatch(initializeTasks(user, 'STARTED'))
                await dispatch(initializeTasks(user, 'WAITING'))
            } catch (exception) {
                dispatch(setMessage('Error when delete task'))
                console.error(exception);
        
                setTimeout(() => {
                    dispatch(setMessage(null))
                }, 5000);
            }
        } else {
                console.log("La tarea no se borró.");
        }
    }


    return (
        <div className="task">
            <hr/>
            <div>
                {formatDate(task.inputDate)} - {task.client.name} - {task.id} - {task.category} - {task.state}
            </div>            
            { (task.state === 'WAITING') ?
                <div>
                    <div>{task.order}</div>
                    <button className="outOfMenuButton" onClick={handleStart} value={'REMOTE'}>Start Remote</button>
                    <button className="outOfMenuButton" onClick={handleStart} value={'ON PREMISE'}>Start On Premise</button>
                    <button className="outOfMenuButton" onClick={handleStart} value={'LOGISTIC'}>Start Logistic</button>
                    <button className="outOfMenuButton" onClick={handleDelete} >Delete task</button>
                </div> :
                <div>
                    <Link to={`/tasks/${task.id}`}>{task.order}</Link>
                </div>     
            } 
        </div>
        
    )
}

export default Task