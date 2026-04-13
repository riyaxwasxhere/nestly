import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dbConnect from './config/db.js'
import authRouter from './routes/authRoutes.js'
import userRouter from './routes/userRoutes.js'
import listingRouter from './routes/listingRoutes.js'

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
app.use('/api/user', userRouter)
app.use('/api/listings', listingRouter)

app.use((err, req, res, next) => {
  console.log("GLOBAL ERROR:", err.message);
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
    dbConnect()
    console.log(`Server is running on port ${port}`)
})