import express from 'express'

import { UsersController } from '../controllers/users.js'
import { tokenChecker } from '../utils/expresssMiddleware.js'

export const usersRouter = express.Router()
usersRouter.post('/', UsersController.Create)
usersRouter.put('/', tokenChecker, UsersController.Update)
usersRouter.get('/:user_id', tokenChecker, UsersController.FindUserById)
