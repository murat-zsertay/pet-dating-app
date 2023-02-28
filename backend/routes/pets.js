import express from 'express'

import { PetsController } from '../controllers/pets.js'
import { tokenChecker } from '../utils/expresssMiddleware.js'

export const petsRouter = express.Router()

petsRouter.get('/', tokenChecker, PetsController.Index)
petsRouter.post('/request', tokenChecker, PetsController.RequestMeetup)
