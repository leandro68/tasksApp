import {useState} from 'react'
import Task from './components/Task'
import NewTaskForm from './components/NewTaskForm'

const App = () => {
  const [tasks, setTasks] = useState(['Betco', 'Bellmor'])
  const [newTask, setNewTask] = useState({})

  return (
    <div>
      <NewTaskForm newtask={newTask} />
      <h2>Tareas</h2>
      <ul>
        { tasks.map(task =>
          <Task key={task.id} task={task} /> 
        )}
      </ul>
    </div>
  )
}

export default App
