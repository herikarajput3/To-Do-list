import { useState } from 'react';
import './App.css'
import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'

function App() {
  const [tasks, setTasks] = useState([]);

  // Example handler (replace with your backend logic)
  const addTask = (data) => setTasks([...tasks, { ...data, id: Date.now(), status: false }]);
  const deleteTask = (task) => setTasks(tasks.filter((t) => t.id !== task.id));
  const completeTask = (task) =>
    setTasks(tasks.map((t) => (t.id === task.id ? { ...t, status: true } : t)));



  return (
    <>
      <Navbar />
      {/* <TaskForm onAddTask={addTask} /> */}
      <TaskList tasks={tasks} onDelete={deleteTask} onComplete={completeTask} />
    </>
  )
}

export default App
