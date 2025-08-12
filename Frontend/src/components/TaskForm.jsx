import { Plus } from 'lucide-react';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';

const TaskForm = ({ onSubmit, editingTask, onCancelEdit, loading }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // when editingTask changes, populate the form
  useEffect(() => {
    if(editingTask){
      reset(editingTask);
    } else {
      reset({ taskName: '', description: '' });
    }

  }, [editingTask, reset]);

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset({ taskName: '', description: '' });
  }
  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => document.getElementById('task_modal').showModal()}
        disabled={loading}
      >
        <Plus /> Add Task
      </button>

      <dialog id="task_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {editingTask ? "Edit Task" : "Add Task"}
          </h3>

          <form className="py-4" onSubmit={handleSubmit(handleFormSubmit)}>
            <input
              type="text"
              placeholder="Task name"
              className="input input-bordered w-full"
              {...register('taskName', { required: 'Task name is required' })}
            />
            {errors.taskName && (
              <span className="text-red-500 text-sm">{errors.taskName.message}</span>
            )}

            <input
              type="text"
              placeholder="Task description"
              className="input input-bordered w-full mt-4"
              {...register('description')}
            />

            <div className="flex gap-2 mt-4">
              <button
                className="btn btn-primary"
                type="submit"
                disabled={loading}
              >
                {loading && <span className="loading loading-spinner loading-sm"></span>}
                {editingTask ? "Update Task" : "Add Task"}
              </button>

              {editingTask && (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onCancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default TaskForm