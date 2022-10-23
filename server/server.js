import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import dotenv from 'dotenv'

// import routes
import routes from './routes/routes.js'
import { Response } from './utils/response.js'
import { setHeaderTimestamp } from './utils/time.js'

dotenv.config({ path: '../.env' })

const app = express()
app.use(express.json())
app.use(helmet())
app.use(cors())

// Routes
app.use('/', setHeaderTimestamp, routes)

console.log(process.env.DATABASE_URL)

// Error Handling request not found
app.use((req, res, next) => {
    const error = new Response("Not Found", "res_notFound");
    next(error);
});

// Error Handling all errors
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        error: {
            status: err.statusCode || 500,
            message: err.message || "Internal Server Error",
        },
    });
});

app.listen(5000, () => {
    console.log(`your application is running on port ${process.env.SERVER_PORT}`)
})