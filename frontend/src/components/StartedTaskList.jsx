//libraries
import { useSelector } from 'react-redux'

//components
import Task from "./Task"

const StartedTaskList = () => {
    const taskList = useSelector(store => store.startedTasks)
    
    return (
      <div>
        <h2>Started Tasks</h2>
        <ul>
          {taskList.map((task) => 
            <Task
              key={task.id}
              task={task}
              //toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )} 
        </ul>
        <hr/>
      </div>
        
    )
}

export default StartedTaskList