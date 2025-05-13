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
import { fetchWaitingTasksData, fetchStartedTasksData } from '../utils/aux.js'

const Task = ({task, setMessage, setWaitingTasks, setStartedTasks}) => {

    //console.log('Task: user:',user)
    
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
            const returnedTask = await taskService.update(id, taskObject);
            //console.log('returnedTask',returnedTask)
            setMessage(`task successfully modified`);
            fetchWaitingTasksData(setWaitingTasks)
            fetchStartedTasksData(setStartedTasks)
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        } catch (exception) {
            setMessage('Error al modificar el estado de la tarea');
            console.error(exception);
    
            setTimeout(() => {
                setMessage(null);
            }, 5000);
        }
            
    }

    const handleDelete = async () => {
        let confirmation = confirm("¿Estás seguro de que quieres borrar esta tarea?");
        if (confirmation) {
            //console.log("Elemento borrado.");
            try {
                const id= task.id
                await taskService.erase(id);
                setMessage(`task successfully deleted`);
                fetchWaitingTasksData(setWaitingTasks)
                fetchStartedTasksData(setStartedTasks)
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            } catch (exception) {
                setMessage('Error when delete task');
                console.error(exception);
        
                setTimeout(() => {
                    setMessage(null);
                }, 5000);
            }
        } else {
                console.log("La tarea no se borró.");
        }
    }

    const handleModify = () => {

    }


    return (
        <div className="task">
            <hr/>
            <div>
                {formatDate(task.inputDate)} - {task.client.name}
            </div>
            <div>
                {task.order}
            </div>
            
                { (task.state === 'WAITING') ?
                   <div>
                        <button className="outOfMenuButton" onClick={handleStart} value={'REMOTE'}>Start Remote</button>
                        <button className="outOfMenuButton" onClick={handleStart} value={'ON PREMISE'}>Start On Premise</button>
                        <button className="outOfMenuButton" onClick={handleStart} value={'LOGISTIC'}>Start Logistic</button>
                        <button className="outOfMenuButton" onClick={handleDelete} >Delete task</button>
                   </div> :
                   <div>
                        <button className="outOfMenuButton" onClick={handleModify} >Modify</button>
                   </div>     
                } 
        </div>
        
    )
}

export default Task