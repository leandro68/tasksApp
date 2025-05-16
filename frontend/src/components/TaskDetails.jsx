import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateTask } from '../reducers/tasksReducer'
import { setMessage } from '../reducers/messageReducer'
import { initializeTasks } from '../reducers/tasksReducer'
import { useNavigate } from 'react-router-dom'

const TaskDetails = ({task}) => {
    const [order, setOrder] = useState(task.order)
    const [report, setReport] = useState(task.report)
    const [transport, setTransport] = useState(task.transport)
    const [tripCost, setTripCost] = useState(task.tripCost)
    
    const transportTypes = ['AUTO','COLECTIVO','SUBTE','TREN']
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const handleRestart = async (event) => {
        event.preventDefault()
        const taskObject = {
            inputDate: task.inputDate,
            userId: task.user.id,
            clientId: task.client.id,
            endWork: null,
            backTrip: null,
            order: task.order, 
            report: null,
            transport: null,
            tripCost: null,
            state: 'WAITING'
        }
        try {
            await dispatch(updateTask(user, task.id, taskObject))
            
            console.log('ir a home', task)
            navigate('/') // Redirigir al usuario a home después de reiniciar la tarea
        } catch (error) {
            dispatch(setMessage({ message: 'Error al reiniciar la tarea', type: 'error' })) 
            console.error('Error al reiniciar la tarea:', error);
            setTimeout(() => {
                dispatch(setMessage(null))
            }, 5000);
        }
    }
    
    return (
        <div>
            <h2>Task Details</h2>
            <p><strong>Input Date:</strong> {new Date(task.inputDate).toLocaleString()}</p>
            <p><strong>Client:</strong> {task.client.name}</p>
            <div>
                <p><strong>Category:</strong> {task.category}</p>
                <button className="outOfMenuButton" onClick={handleRestart}>Restart Task</button>
            </div>
            
            <p><strong>Start Work:</strong> {new Date(task.startWork).toLocaleString()}</p>
            <p><strong>Go Trip:</strong> {new Date(task.goTrip).toLocaleString()}</p>
            <p><strong>End Work:</strong> {new Date(task.endWork).toLocaleString()}</p>
            <p><strong>Back Trip:</strong> {new Date(task.backTrip).toLocaleString()}</p>
            <p><strong>Order:</strong></p>
            <textarea
                placeholder="Detalles del pedido"
                value={task.order}
                onChange={({ target }) => setOrder(target.value)}
                rows={5} // Número de líneas visibles
                cols={50} // Ancho del área de texto
            />
            <p><strong>Report:</strong> {task.report}</p>
            <textarea
                placeholder="Detalles del pedido"
                onChange={({ target }) => setReport(target.value)}
                rows={5} // Número de líneas visibles
                cols={50} // Ancho del área de texto
            />
            <div>
                <label htmlFor="transport" >Transport:</label>
                
                <select id="transport" value={task.transport} onChange={({ target }) => setTransport(target.value)}>
                            {transportTypes.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                </select>
            </div>
            <div>
                <label htmlFor="tripCost">Trip Cost:</label>
                <input
                    type="number"
                    id="tripCost"
                    value={task.tripCost}
                    onChange={({ target }) => setTripCost(target.value)}
                />
            </div>
            <p><strong>State:</strong> {task.state}</p>

        </div>
    )
}

export default TaskDetails


