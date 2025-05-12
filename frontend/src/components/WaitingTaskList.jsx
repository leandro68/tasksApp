import Task from "./Task"

const WaitingTaskList = ({taskList, setMessage, user, setWaitingTasks, setStartedTasks, setClientList}) => {

    return (
        <div>
        <h2>Waiting Tasks</h2>
        <ul>
          {taskList.map((task) => 
            <Task
              key={task.id}
              task={task} 
              setMessage={setMessage}
              user={user} 
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

export default WaitingTaskList