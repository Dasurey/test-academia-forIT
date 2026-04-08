import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import { createTask, deleteTask, getTasks, updateTask } from './api/tasksApi'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const data = await getTasks()
        setTasks(data)
      } catch (err) {
        console.error(err)
        setError(err.message || 'No se pudieron cargar las tareas.')
      } finally {
        setIsLoading(false)
      }
    }

    loadTasks()
  }, [])

  const handleCreateTask = async (task) => {
    setError(null)
    try {
      const created = await createTask({
        title: task.title,
        description: task.description,
      })
      setTasks((current) => [...current, created])
    } catch (err) {
      console.error(err)
      setError(err.message || 'No se pudo crear la tarea.')
      throw err
    }
  }

  const handleUpdateTask = async (task) => {
    setError(null)
    try {
      const updated = await updateTask(task.id, {
        title: task.title,
        description: task.description,
        completed: Boolean(task.completed),
      })
      setTasks((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      )
    } catch (err) {
      console.error(err)
      setError(err.message || 'No se pudo actualizar la tarea.')
      throw err
    }
  }

  const handleToggleTask = async (id) => {
    setError(null)
    const currentTask = tasks.find((task) => task.id === id)
    if (!currentTask) return

    try {
      const updated = await updateTask(id, {
        completed: !currentTask.completed,
      })
      setTasks((current) =>
        current.map((item) => (item.id === updated.id ? updated : item)),
      )
    } catch (err) {
      console.error(err)
      setError(err.message || 'No se pudo actualizar la tarea.')
    }
  }

  const handleDeleteTask = async (id) => {
    setError(null)
    try {
      await deleteTask(id)
      setTasks((current) => current.filter((task) => task.id !== id))
    } catch (err) {
      console.error(err)
      setError(err.message || 'No se pudo eliminar la tarea.')
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        <header className="app-header">
          <h1>ForIT Tasks</h1>
        </header>

        {error && <div className="app-error">{error}</div>}

        <Routes>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route
            path="/tasks"
            element={
              <TaskList
                tasks={tasks}
                isLoading={isLoading}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            }
          />
          <Route
            path="/tasks/new"
            element={
              <TaskForm
                tasks={tasks}
                onSave={handleCreateTask}
              />
            }
          />
          <Route
            path="/tasks/:id/edit"
            element={
              <TaskForm
                tasks={tasks}
                onSave={handleUpdateTask}
              />
            }
          />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
