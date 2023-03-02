import express from 'express'

import { PetsController } from '../controllers/pets.js'
import { tokenChecker } from '../utils/expresssMiddleware.js'

import upload from '../config/multer.js'

export const petsRouter = express.Router()

petsRouter.get('/', tokenChecker, PetsController.Index)
petsRouter.post('/profile-image-upload', tokenChecker, upload.single('image'), PetsController.UploadImage)
petsRouter.put('/profile-image-edit', tokenChecker, PetsController.UpdateImage)
