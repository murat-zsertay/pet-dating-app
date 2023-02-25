import express from 'express'

import { UsersController } from '../controllers/users.js'
import { tokenChecker } from '../utils/expresssMiddleware.js'

export const usersRouter = express.Router()

usersRouter.post('/:user_id/profile', tokenChecker, UsersController.CreateProfile)
usersRouter.get('/:user_id', UsersController.FindUserById)
usersRouter.post('/', UsersController.Create)
