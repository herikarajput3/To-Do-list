// src/components/TaskForm.jsx
import React, { useState } from 'react';

export default function TaskForm({ onAddTask }) {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    // Optional: Show error if user submits an empty task
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim() === '') {
            setError('Task name is required.');
            return;
        }
        onAddTask({ taskName, description });
        setTaskName('');
        setDescription('');
        setError('');
    };

    return (
        <form className="flex flex-col gap-3 mb-6" onSubmit={handleSubmit}>
            <div>
                <input
                    className="input input-bordered w-full"
                    placeholder="Add a new task..."
                    value={taskName}
                    onChange={e => setTaskName(e.target.value)}
                />
            </div>
            <div>
                <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Optional description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
            </div>
            {error && <div className="alert alert-error py-1">{error}</div>}
            <button className="btn btn-primary w-full" type="submit">
                Add Task
            </button>
        </form>
    );
}
