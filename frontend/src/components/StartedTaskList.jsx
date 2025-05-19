//libraries


import { useSelector } from 'react-redux'

//components
import Task from "./Task"

const StartedTaskList = () => {
    const taskList = useSelector(store => store.startedTasks)
    
    return (
      <div>
        <h2>Started Tasks</h2>
        {taskList.length === 0 ? (
          <p>NO HAY TAREAS COMENZADAS</p>
        ) : (
          <ul>
            {taskList.map((task) => 
              <Task
                key={task.id}
                task={task}
              />
            )} 
          </ul>
        )}
        <hr/>
      </div>
    )
}

export default StartedTaskList