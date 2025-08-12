import React from 'react'
import TaskItem from './TaskItem';

const TaskList = ({ tasks, loading, onEdit, onDelete, onToggleStatus }) => {
    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center p-8 text-gray-500">
                No tasks available. Create your first task!
            </div>
        );
    }

    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            {tasks.map((task) => (
                <TaskItem
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleStatus={onToggleStatus}
                />
            ))}
        </ul>
    );

}

export default TaskList