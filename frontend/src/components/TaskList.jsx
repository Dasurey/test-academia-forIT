import { Link } from 'react-router-dom'
import TaskItem from './TaskItem'

function TaskList({ tasks = [], isLoading, onToggleTask, onDeleteTask }) {
  let content

  if (isLoading) {
    content = <p className="task-page__empty">Cargando tareas...</p>
  } else if (!tasks.length) {
    content = <p className="task-page__empty">Todav&iacute;a no hay tareas.</p>
  } else {
    content = (
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={() => onToggleTask?.(task.id)}
            onDelete={() => onDeleteTask?.(task.id)}
          />
        ))}
      </ul>
    )
  }

  return (
    <main className="task-page">
      <header className="task-page__header">
        <h1>Lista de tareas</h1>
        <Link to="/tasks/new" className="button">
          Nueva tarea
        </Link>
      </header>

      {content}
    </main>
  )
}

export default TaskList
