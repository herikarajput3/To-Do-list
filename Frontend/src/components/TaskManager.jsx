import React, { useState } from 'react'
import { useTasks } from '../hooks/useTasks'
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import { Toaster } from 'react-hot-toast';

const TaskManager = () => {
    const { tasks, loading, addTask, updateTask, deleteTask, toggleTaskStatus } = useTasks();
    const [editingTask, setEditingTask] = useState(null);

    const handleFormSubmit = async (data) => {
        if (editingTask) {
            await updateTask(editingTask._id, data);
            setEditingTask(null);
        } else {
            await addTask(data);
        }
        // close modal
        document.getElementById('task_modal').close();
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        document.getElementById('task_modal').showModal();
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
        document.getElementById('task_modal').close();
    };


    return (
        <div className="container mx-auto p-4">
            <TaskForm
                onSubmit={handleFormSubmit}
                editingTask={editingTask}
                onCancelEdit={handleCancelEdit}
                loading={loading}
            />

            <div className="mt-6">
                <TaskList
                    tasks={tasks}
                    loading={loading}
                    onEdit={handleEdit}
                    onDelete={deleteTask}
                    onToggleStatus={toggleTaskStatus}
                />
            </div>

            <Toaster position='top-right' reverseOrder={false} />
            
        </div>
    );
};

export default TaskManager