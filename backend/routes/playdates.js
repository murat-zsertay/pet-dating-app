import express from 'express'

import { PlaydateController } from '../controllers/playdate.js'
import { tokenChecker } from '../utils/expresssMiddleware.js'

export const playdatesRouter = express.Router()

playdatesRouter.post('/request', tokenChecker, PlaydateController.Create)
playdatesRouter.get('/requests', tokenChecker, PlaydateController.Index)
playdatesRouter.put('/requests-response', tokenChecker, PlaydateController.UpdateRequest)
