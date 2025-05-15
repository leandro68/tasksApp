//libraries
import { useSelector } from 'react-redux'

//components
import Task from "./Task"

const WaitingTaskList = () => {
    const taskList = useSelector(state => state.waitingTasks)

    return (
        <div>
        <h2>Waiting Tasks</h2>
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

export default WaitingTaskList