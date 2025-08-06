import React from 'react';
import { useForm } from 'react-hook-form';

const TaskForm = ({ onAddTask }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Task submitted:', data);
    
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        className="w-full max-w-md bg-base-100 p-7 rounded-xl shadow-lg flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Add new task form"
      >
        <div className="form-control">
          <input
            type="text"
            placeholder="Add a new task *"
            className={`input input-bordered w-full ${errors.taskName ? 'input-error' : ''}`}
            {...register('taskName', {
              required: 'Task name is required',
              maxLength: 100,
              minLength: 3,
            })}
            aria-invalid={errors.taskName ? 'true' : 'false'}
            aria-describedby="taskName-error"
            autoComplete="off"
          />
          {errors.taskName && (
            <p className="text-error text-xs mt-1" id="taskName-error">{errors.taskName.message}</p>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Add description (optional)"
            className="input input-bordered w-full"
            {...register('description', { maxLength: 250 })}
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary w-full">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
