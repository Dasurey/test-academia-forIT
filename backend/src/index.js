import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'

import apiRouter from './routes.js'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.json({ message: 'ForIT Tasks API' })
})

app.use('/api', apiRouter)

// Manejo básico de errores
app.use((err, req, res, next) => {
    console.error(err)
    if (res.headersSent) return next(err)
    res.status(500).json({ error: 'Error interno del servidor' })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
