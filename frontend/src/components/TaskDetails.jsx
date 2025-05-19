import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedTask, updateTask } from '../reducers/tasksReducer'
import { setMessage } from '../reducers/messageReducer'
import { selectedTaskReducer } from '../reducers/tasksReducer'
import { useNavigate } from 'react-router-dom'

const TaskDetails = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const task = useSelector(state => state.selectedTask)
    
    const [order, setOrder] = useState('')
    const [report, setReport] = useState('')
    const [transport, setTransport] = useState('')
    const [tripCost, setTripCost] = useState(null)
    
    useEffect(() => {
        if (task) {
            setOrder(task.order)
            setReport(task.report)
            setTransport(task.transport)
            setTripCost(task.tripCost)
        }
    }, [])  

    const transportTypes = ['AUTO','COLECTIVO','SUBTE','TREN']
    
    const navigate = useNavigate()

    
    
    const updateSelectedTask = async (taskObject) => {
        event.preventDefault()
        try {
            const id= task.id
            await dispatch(updateTask(user, id, taskObject))
            await dispatch(setSelectedTask(null))
            navigate('/') // Redirigir al usuario a home después de reiniciar la tarea
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
            startWork: null,
            goTrip: null,
            endTrip: null,
            endWork: null,
            backTrip: null,
            report: null,
            transport: null,
            tripCost: null,
            state: 'WAITING',
            category: null
        }
        updateSelectedTask(taskObject)
    }

    const handleStartTask = (event) => {
        event.preventDefault()
        const taskObject = {
            ...task,
            userId: task.user.id,
            clientId: task.client.id,
            startWork: Date.now(),
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
        }
        updateTask(taskObject)
    }

    const handleEndTask = async (event) => {
        event.preventDefault()
        const taskObject = {
            ...task,
            userId: task.user.id,
            clientId: task.client.id,
            endWork: Date.now(),
            state: 'FINISHED',
        }
        updateTask(taskObject)
    }
    
    return (
        !task ?
            <></>
        :
        <div>
            <h2>Detalle de la tarea</h2>
            <p><strong>Fecha:</strong> {new Date(task.inputDate).toLocaleString()}</p>
            <p><strong>Cliente:</strong> {task.client.name}</p>
            
            <div>
                <p><strong>Categoria:</strong> {task.category}</p>
                <button className="outOfMenuButton" onClick={handleRestart}>Reiniciar la tarea</button>
            </div>
            
            { task.category !== 'REMOTE' && !task.startWork ?
                <button className="outOfMenuButton" onClick={handleStartTask}>Iniciar trabajo</button>
            : <></>
            }
            { task.category !== 'REMOTE' && task.startWork && !task.backTrip?
                <button className="outOfMenuButton" onClick={handleBackTrip}>Comenzar la vuelta</button>
            : <></>
            }
            { (task.category !== 'REMOTE' && task.backTrip) && (task.category === 'REMOTE' && task.startWork)?
                <button className="outOfMenuButton" onClick={handleEndTask}>Finalizar tarea</button>
            : <></>
            }             
            
             
            <p><strong>Pedido:</strong></p>
            <textarea
                placeholder="Detalles del pedido"
                value={task.order}
                onChange={({ target }) => setOrder(target.value)}
                rows={5} // Número de líneas visibles
                cols={50} // Ancho del área de texto
            />
            <p><strong>Reporte:</strong> {task.report}</p>
            <textarea
                placeholder="Detalles del pedido"
                onChange={({ target }) => setReport(target.value)}
                rows={5} // Número de líneas visibles
                cols={50} // Ancho del área de texto
            />
            {task.category !== 'REMOTE' ?
                <div>
                    <label htmlFor="transport" >Transporte:</label>
                    
                    <select id="transport" value={task.transport} onChange={({ target }) => setTransport(target.value)}>
                                {transportTypes.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                ))}
                    </select>
                
                    <label htmlFor="tripCost">Costo del viaje:</label>
                    <input
                        type="number"
                        id="tripCost"
                        value={task.tripCost}
                        onChange={({ target }) => setTripCost(target.value)}
                    />
                </div>
            : <></>
            }
            <p><strong>Estado de la tarea:</strong> {task.state}</p>

        </div>
        
        
    )
}

export default TaskDetails


