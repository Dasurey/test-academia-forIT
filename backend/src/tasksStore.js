import { nanoid } from 'nanoid'

// In-memory task store
const tasks = []

export function getAllTasks() {
    return tasks
}

export function createTask({ title, description = '' }) {
    const now = new Date()
    const task = {
        id: nanoid(),
        title,
        description,
        completed: false,
        createdAt: now
    }
    tasks.push(task)
    return task
}

export function findTaskById(id) {
    return tasks.find(t => t.id === id)
}

export function updateTask(id, updates) {
    const task = findTaskById(id)
    if (!task) return null

    if (typeof updates.title === 'string') {
        task.title = updates.title
    }
    if (typeof updates.description === 'string') {
        task.description = updates.description
    }
    if (typeof updates.completed === 'boolean') {
        task.completed = updates.completed
    }

    return task
}

export function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id)
    if (index === -1) return false
    tasks.splice(index, 1)
    return true
}
