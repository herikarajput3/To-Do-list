import axios from 'axios';
import { Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

const TaskForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [taskData, setTaskData] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);

  const onSubmit = async (data) => {
    try {
      if (editTaskId) {
        const response = await axios.put(`http://localhost:3000/api/tasks/${editTaskId}`, data);
        console.log("Task updated:", response.data);
        if (response.status === 200) {
          console.log(response.data.message);
          toast.success(response.data.message);
          getTasks();
        }
        else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post("http://localhost:3000/api/tasks", data);
        console.log("Task added:", response.data);
        if (response.status === 201) {
          console.log(response.data.message);
          toast.success(response.data.message);
          getTasks();
        }
        else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      }
      getTasks();
      reset({
        taskName: "",
        description: "",

      });
      setEditTaskId(null);
    } catch (error) {
      console.error("Error adding/updating task:", error);
      toast.error("Something went wrong.");
    }
  }

  const getTasks = async () => {
    const response = await axios.get("http://localhost:3000/api/tasks");
    // console.log(response.data.data);
    let tasks = response.data;
    setTaskData(tasks.data);
  }

  const toggleTaskStatus = async (task) => {
    try {
      const updatedTask = {
        ...task,
        status: !task.status
      };

      const response = await axios.put(`http://localhost:3000/api/tasks/${task._id}`, updatedTask);

      if (response.status === 200) {
        toast.success("Task status updated!");
        getTasks();
      } else {
        toast.error("Failed to update task status.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Something went wrong while updating status.");
    }
  }

  const editTask = async (task) => {
    // Open the modal and populate the form with the task data
    setEditTaskId(task._id);
    reset(task);
    document.getElementById('my_modal_1').showModal();
  }

  const deleteTask = async (taskId) => {
    const response = await axios.delete(`http://localhost:3000/api/tasks/${taskId}`);
    if (response.status === 200) {
      toast.success("Task deleted successfully!");
      getTasks();
    } else {
      toast.error("Failed to delete task.");
    }
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>

      <ul className="list bg-base-100 rounded-box shadow-md">
        {taskData ? (
          taskData.map((task, index) => {
            return (
              <li key={index} className="list-row">
                <div className="text-4xl font-thin opacity-30 tabular-nums">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-info"
                    checked={task.status}
                    onChange={() => toggleTaskStatus(task)} />
                </div>
                <div className="list-col-grow">
                  <div className={task.status ? "line-through text-gray-400" : ""}>{task.taskName}</div>
                  <div className={`text-xs uppercase font-semibold ${task.status ? "line-through text-gray-400" : "opacity-60"}`}>{task.description}</div>
                </div>
                <button className="btn btn-primary" onClick={() => editTask(task)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteTask(task._id)}>Delete</button>
              </li>
            )
          }))
          : (
            <span className="text-center text-gray-500">No tasks available</span>
          )}
      </ul>

      <button className="text-white btn" onClick={() => document.getElementById('my_modal_1').showModal()}><Plus /></button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {editTaskId ? "Edit Task" : "Add Task"}
          </h3>

          <form className="py-4" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" placeholder="Task name" className="input w-full" {...register('taskName', { required: true })} />
            {errors.taskName && <span className="text-red-500">This field is required</span>}

            <input type="text" placeholder="Task description" className="input w-full mt-4" {...register('description')} />
            {errors.description && <span className="text-red-500"></span>}

            <button className='btn' type='submit'>
              {editTaskId ? "Update Task" : "Add Task"}
            </button>
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
