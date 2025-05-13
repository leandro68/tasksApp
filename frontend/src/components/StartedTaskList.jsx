import Task from "./Task"

const StartedTaskList = ({taskList, setWaitingTasks, setStartedTasks, setClientList}) => {
    
    return (
      <div>
        <h2>Started Tasks</h2>
        <ul>
          {taskList.map((task) => 
            <Task
              key={task.id}
              task={task} 
              setWaitingTasks={setWaitingTasks} 
              setStartedTasks={setStartedTasks} 
              setClientList={setClientList}
              //toggleImportance={() => toggleImportanceOf(note.id)}
            />
          )} 
        </ul>
        <hr/>
      </div>
        
    )
}

export default StartedTaskList