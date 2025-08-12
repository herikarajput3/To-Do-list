import React from 'react'

const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => {
    return (
        <li className='list-row'>
            <div className="text-4xl font-thin opacity-30 tabular-nums">
                <input
                    type='checkbox'
                    className="checkbox checkbox-info"
                    checked={task.status}
                    onChange={() => onToggleStatus(task)}
                />
            </div>
            <div className="list-col-grow">
                <div className={task.status ? "line-through text-gray-400" : ""}>
                    {task.taskName}
                </div>
                <div className={`text-xs uppercase font-semibold ${task.status ? "line-through text-gray-400" : "opacity-60"}`}>
                    {task.description}
                </div>
            </div>
            <button
                className="btn btn-primary"
                onClick={() => onEdit(task)}
            >
                Edit
            </button>
            <button
                className="btn btn-error"
                onClick={() => onDelete(task._id)}
            >
                Delete
            </button>
        </li>
    )
}

export default TaskItem;