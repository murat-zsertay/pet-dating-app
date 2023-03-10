// Module imports
import express from 'express'
import path from 'path'
import logger from 'morgan'
// Routes
import { tokensRouter } from './routes/tokens.js'
import { usersRouter } from './routes/users.js'
import { playdatesRouter } from './routes/playdates.js'
// Config
import './utils/envConfig.js'
import './utils/databaseConnection.js'
// Middleware
import { catch404, errorHandler } from './utils/expresssMiddleware.js'
// Listeners
import { normalizePort, onError, onListening } from './utils/serverListensers.js'
import { petsRouter } from './routes/pets.js'

// import cloudinary
import { v2 as cloudinary } from 'cloudinary';

export const app = express()
// setup for receiving JSON
app.use(express.json())
app.use(logger('dev'))
app.use(express.static(path.join(process.cwd(), 'public')))
// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

// route setup

app.use('/tokens', tokensRouter)
app.use('/users', usersRouter)
app.use('/pets', petsRouter)
app.use('/playdates', playdatesRouter)
// catch 404 and forward to error handler
app.use(catch404)

// error handler
app.use(errorHandler)
// TODO: See why we need to do the below check and if it needs to be done
if (process.env.NODE_ENV !== 'test') {
  const PORT = normalizePort(process.env.PORT)
  const server = app.listen(PORT)
  server.on('error', onError)
  server.on('listening', onListening)
}


// Cloudinary Configuration detials
cloudinary.config({
  cloud_name: 'dco5jma0q',
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});


// TODO: Ensuring PM2 is clear and how to use it
