import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST']
}))

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))
app.use(express.static("public"))
app.use(cookieParser())

// routes 
import userRoutes from './Routes/user.router.js'




// declaration of the route 
app.use('/api/v1/users', userRoutes)

export {
    app
}