import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTask, updateTask } from '../reducers/tasksReducer'
import { setMessage } from '../reducers/messageReducer'
import { useNavigate } from 'react-router-dom'

const TaskDetails = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const task = useSelector(state => state.selectedTask)
    const [order, setOrder] = useState('')
    const [report, setReport] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        if (task) {
            setOrder(task.order)
            setReport(task.report || '')
        }
    }, [])  

    const updateSelectedTask = async (taskObject) => {
        event.preventDefault()
        try {
            const id= task.id
            await dispatch(updateTask(user, id, taskObject))
            await dispatch(setSelectedTask(null))
            navigate('/') // Redirigir al usuario a home después de actualizar la tarea
        } catch (error) {
            dispatch(setMessage({ message: 'Error al reiniciar la tarea', type: 'error' })) 
            console.error('Error al reiniciar la tarea:', error);
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000);
        }
    }
    
    const handleRestart = async (event) => {
        event.preventDefault()
        const taskObject = {
            ...task,
            userId: task.user.id,
            clientId: task.client.id,
            goTrip: null,
            startWork: null,
            endWork: null,
            backTrip: null,
            report: null,
            state: 'WAITING',
            category: null
        }
        updateSelectedTask(taskObject)
    }

    const handleStartTask = async (event) => {
        event.preventDefault()
        const taskObject = {
            ...task,
            userId: task.user.id,
            clientId: task.client.id,
            startWork: Date.now(),
            order: order,
            report: report
        }
        updateSelectedTask(taskObject)
    }

    const handleEndTask = async (event) => {
        event.preventDefault()
        const taskObject = {
            ...task,
            userId: task.user.id,
            clientId: task.client.id,
            endWork: Date.now(),
            order: order,
            report: report
        }
        updateSelectedTask(taskObject)
    }

    const handleBackTrip = async (event) => {
        event.preventDefault()
        const taskObject = {
            ...task,
            userId: task.user.id,
            clientId: task.client.id,
            backTrip: Date.now(),
            state: 'FINISHED',
            order: order,
            report: report
        }
        updateSelectedTask(taskObject)
    }
    
    const handleEndTask_Trip = async (event) => {
        event.preventDefault()
        const taskObject = {
            ...task,
            userId: task.user.id,
            clientId: task.client.id,
            endWork: Date.now(),
            state: 'FINISHED',
            order: order,
            report: report
        }
        updateSelectedTask(taskObject)
    }

    const saveOrder_Report = async (event) => {
        event.preventDefault()
        const taskObject = {
            ...task,
            userId: task.user.id,
            clientId: task.client.id,
            order: order,
            report: report
        }
        updateSelectedTask(taskObject)
    }
    
    
    return (
        !task ?
            <></>
        :
        <div>
            <h2>Detalle de la tarea</h2>
            <p><strong>Fecha:</strong> {new Date(task.inputDate).toLocaleString()}</p>
            <p><strong>Cliente:</strong> {task.client.name}</p>
            <div className="textarea-container">
                <label>Pedido: </label>
                <textarea
                    value={order}
                    onChange={({ target }) => setOrder(target.value)}
                    rows={5} // Número de líneas visibles
                    cols={50} // Ancho del área de texto
                />  
            </div>
            <div className="textarea-container">
                <label>Reporte: </label>
                <textarea
                    placeholder="Reporte de la tarea realizada"
                    onChange={({ target }) => setReport(target.value)}
                    value={report}
                    rows={5} // Número de líneas visibles
                    cols={50} // Ancho del área de texto
                />
                
            </div>
            <button className="outOfMenuButton" onClick={saveOrder_Report}>Guardar pedido o reporte </button>
            <p><strong>Estado de la tarea:</strong> {task.state}</p>
            <p><strong>Categoria:</strong> {task.category}</p>
            <div>
                <button className="outOfMenuButton" onClick={handleRestart}>Reiniciar la tarea</button>
                { task.category !== 'REMOTE' && !task.startWork ?
                    <button className="outOfMenuButton" onClick={handleStartTask}>Iniciar trabajo</button>
                : <></>
                }
                { task.startWork && !task.endWork ?
                        <button className="outOfMenuButton" onClick={handleEndTask}>Finalizar tarea</button>
                : <></>
                }
                { (task.category !=='REMOTE' && task.startWork && task.endWork ) ?
                        <button className="outOfMenuButton" onClick={handleBackTrip}>Finalizar viaje</button>
                : <></>
                } 
                { task.category !== 'REMOTE' && task.startWork && !task.endWork ?
                    <button className="outOfMenuButton" onClick={handleEndTask_Trip}>Finalizar trabajo y viaje</button>
                : <></>
                }

            </div>
             
        </div>
        
        
    )
}

export default TaskDetails


