const API_BASE_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:4000').replace(/\/+$/, '')
const TASKS_URL = `${API_BASE_URL}/api/tasks`

async function handleResponse(response) {
  if (!response.ok) {
    let message = 'Error en la solicitud'
    try {
      const data = await response.json()
      message = data.error || data.message || message
    } catch {
      // Ignorar error al parsear JSON
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function getTasks() {
  const response = await fetch(TASKS_URL)
  return handleResponse(response)
}

export async function createTask({ title, description }) {
  const response = await fetch(TASKS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, description }),
  })

  return handleResponse(response)
}

export async function updateTask(id, updates) {
  const response = await fetch(`${TASKS_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  })

  return handleResponse(response)
}

export async function deleteTask(id) {
  const response = await fetch(`${TASKS_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    return handleResponse(response)
  }

  return null
}
