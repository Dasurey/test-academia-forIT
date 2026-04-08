import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function TaskForm({ tasks, onSave }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isEditing && tasks) {
      const existing = tasks.find((task) => task.id === id)
      if (existing) {
        setTitle(existing.title)
        setDescription(existing.description || '')
        setCompleted(existing.completed)
      }
    }
  }, [isEditing, id, tasks])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!title.trim()) {
      setError('El t&iacute;tulo es obligatorio.')
      return
    }

    const payload = {
      id: isEditing ? id : undefined,
      title: title.trim(),
      description: description.trim(),
      completed,
    }

    try {
      setIsSubmitting(true)
      setError('')
      if (onSave) {
        await onSave(payload)
      }
      navigate('/tasks')
    } catch (err) {
      console.error(err)
      setError(err.message || 'No se pudo guardar la tarea.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="task-page">
      <header className="task-page__header">
        <h1>{isEditing ? 'Editar tarea' : 'Nueva tarea'}</h1>
      </header>

      <form className="task-form" onSubmit={handleSubmit}>
        {error && <p className="form-error">{error}</p>}
        <label className="task-form__field">
          <span>T&iacute;tulo</span>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Escribe el t&iacute;tulo de la tarea"
          />
        </label>

        <label className="task-form__field">
          <span>Descripci&oacute;n</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Detalles adicionales (opcional)"
            rows={4}
          />
        </label>

        <label className="task-form__field task-form__checkbox">
          <input
            type="checkbox"
            checked={completed}
            onChange={(event) => setCompleted(event.target.checked)}
          />
          <span>Completada</span>
        </label>

        <div className="task-form__actions">
          <button type="submit" className="button" disabled={isSubmitting}>
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            className="button button--secondary"
            onClick={() => navigate('/tasks')}
          >
            Cancelar
          </button>
        </div>
      </form>
    </main>
  )
}

export default TaskForm
