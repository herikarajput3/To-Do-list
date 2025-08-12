import { useCallback, useEffect, useState } from "react"
import { taskService } from "../services/taskService.js";
import toast from "react-hot-toast";

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Get all tasks - useCallback prevents infinite re-renders
    // Here why use usecallback? I want to understand this hook in detail
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await taskService.getAllTasks();
            setTasks(data.data);
        } catch (error) {
            setError(error);
            toast.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }, []);

    // Add new task
    const addTask = async (taskData) => {
        try {
            setLoading(true);
            // why don't you add setError(null) here?
            const response = await taskService.createTask(taskData);
            toast.success(response.message);
            await fetchTasks();
        } catch (error) {
            setError(error);
            toast.error("Failed to add task");
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (taskId, taskData) => {
        try {
            setLoading(true);
            const response = await taskService.updateTask(taskId, taskData);
            toast.success(response.message);
            await fetchTasks();
        } catch (error) {
            setError(error);
            toast.error("Failed to update task");
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            setLoading(true);
            const response = await taskService.deleteTask(taskId);
            toast.success(response.message);
            await fetchTasks();
        } catch (error) {
            setError(error);
            toast.error("Failed to delete task");
        } finally {
            setLoading(false);
        }
    };

    // Toggle task status
    const toggleTaskStatus = async (task) => {
        const updatedTask = { ...task, status: !task.status };
        await updateTask(task._id, updatedTask);
    };

    // Load tasks when hook is first used
    //I'm not able to understand below thing and purpose of it
    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // I'm not able to understand below thing and purpose of it
    return {
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        refreshTasks: fetchTasks
        // why not just call fetchTasks directly?
    };

};
