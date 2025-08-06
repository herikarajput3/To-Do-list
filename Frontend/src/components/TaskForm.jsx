import axios from 'axios';
import { Plus } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const TaskForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    const response = await axios.post("http://localhost:3000/api/tasks", data);
    console.log("Task added:", response.data);
    if (response.status === 201) {
      console.log(response.data.message);

      toast.success(response.data.message);
    }
    else {
      console.log(response.data.message);

      toast.error(response.data.message);
    }
    reset();
  }

  const addTask = () => {
    // console.log("add");

  }
  return (
    <>
      <button className="text-white btn" onClick={() => document.getElementById('my_modal_1').showModal()}><Plus /></button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Task</h3>

          <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Task name" className="input w-full" {...register('taskName', { required: true })} />
            {errors.taskName && <span className="text-red-500">This field is required</span>}

            <input type="text" placeholder="Task description" className="input w-full mt-4" {...register('description')} />
            {errors.description && <span className="text-red-500"></span>}

            <button className='btn' type='submit' onClick={addTask}>Add task</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  )
}

export default TaskForm
