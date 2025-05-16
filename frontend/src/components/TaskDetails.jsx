const TaskDetails = ({task}) => {
    console.log('TaskDetails', task)
    return (
        <div>
            <h2>Task Details</h2>
            <p><strong>Input Date:</strong> {new Date(task.inputDate).toLocaleString()}</p>
            <p><strong>Client:</strong> {task.client.name}</p>
            <p><strong>Category:</strong> {task.category}</p>
            <p><strong>Start Work:</strong> {new Date(task.startWork).toLocaleString()}</p>
            <p><strong>Go Trip:</strong> {new Date(task.goTrip).toLocaleString()}</p>
            <p><strong>End Work:</strong> {new Date(task.endWork).toLocaleString()}</p>
            <p><strong>Back Trip:</strong> {new Date(task.backTrip).toLocaleString()}</p>
            <p><strong>Order:</strong> {task.order}</p>
            <p><strong>Report:</strong> {task.report}</p>
            <p><strong>Transport:</strong> {task.transport}</p>
            <p><strong>tripCost:</strong> {task.tripCost}</p>
            <p><strong>State:</strong> {task.state}</p>

        </div>
    )
}

export default TaskDetails


