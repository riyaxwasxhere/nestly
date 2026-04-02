import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dbConnect from './config/db.js'
import authRouter from './routes/authRoutes.js'

dotenv.config()
const app = express()
const port = process.env.PORT

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    dbConnect()
    console.log(`Server is running on port ${port}`)
})