import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTask, findTaskById } from './tasksStore.js'

const router = express.Router()

// GET /api/tasks - Obtener todas las tareas
router.get('/tasks', (req, res) => {
    const tasks = getAllTasks()
    res.json(tasks)
})

// POST /api/tasks - Crear una nueva tarea
router.post('/tasks', (req, res, next) => {
    try {
        const { title, description } = req.body

        if (!title || typeof title !== 'string') {
            return res.status(400).json({ error: 'El título es requerido y debe ser un string.' })
        }

        const task = createTask({ title, description })
        res.status(201).json(task)
    } catch (err) {
        next(err)
    }
})

// PUT /api/tasks/:id - Actualizar una tarea existente
router.put('/tasks/:id', (req, res, next) => {
    try {
        const { id } = req.params
        const existing = findTaskById(id)

        if (!existing) {
            return res.status(404).json({ error: 'Tarea no encontrada.' })
        }

        const updated = updateTask(id, req.body)
        res.json(updated)
    } catch (err) {
        next(err)
    }
})

// DELETE /api/tasks/:id - Eliminar una tarea
router.delete('/tasks/:id', (req, res, next) => {
    try {
        const { id } = req.params
        const ok = deleteTask(id)

        if (!ok) {
            return res.status(404).json({ error: 'Tarea no encontrada.' })
        }

        res.status(204).send()
    } catch (err) {
        next(err)
    }
})

export default router
