import { Link } from 'react-router-dom'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={`task-item ${task.completed ? 'task-item--completed' : ''}`}>
      <label className="task-item__main">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
        />
        <div>
          <span className="task-item__title">{task.title}</span>
          {task.description && (
            <span className="task-item__description">{task.description}</span>
          )}
        </div>
      </label>
      <div className="task-item__actions">
        <Link to={`/tasks/${task.id}/edit`} className="button button--secondary">
          Editar
        </Link>
        <button
          type="button"
          className="button button--danger"
          onClick={onDelete}
        >
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default TaskItem
