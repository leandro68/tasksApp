import Task from "./Task"
import { fetchUserData } from '../utils/aux.js'

const StartedTaskList = ({taskList, setMessage}) => {
    
    return (
      <div>
        <h2>Started Tasks</h2>
        <ul>
          {taskList.map((task) => 
            <Task
              key={task.id}
              task={task} 
              setMessage={setMessage}
              //toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )} 
        </ul>
        <hr/>
      </div>
        
    )
}

export default StartedTaskList