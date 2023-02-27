import { describe, expect, jest, test } from '@jest/globals'
import { app } from '../../app.js'
import request from 'supertest'
import '../mongodb_helper'
import { User } from '../../models/user.js'
import { TokenGenerator } from '../../models/token_generator.js'
import { PetsController } from '../../controllers/pets.js'
import { setupMockUser } from '../utils.js'

const sendRequest = async (method, route, token) => {
  return await request(app)
    .method(method)
    .route('/pets')
    .set('Authorization', `Bearer ${token}`)
    .send()
}
describe('/pets', () => {
  beforeAll(async () => {
    await User.deleteMany({})
  })

  describe('GET, when token is present', () => {
    test('responds with a 201', async () => {
      const { user, token } = await setupMockUser()
      const response = await request(app)
        .get('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send()
      // check if it is an array
      expect(Array.isArray(user.pets)).toBe(true)
      // create expression to check if the array contains the expected object
      const expectedArr = [
        expect.objectContaining(user.pets[0])
      ]
      // check if the response is 200 and if the array contains the expected object
      expect(response.status).toEqual(200)
      // check if the array contains the expected object
      expect(user.pets).toEqual(expect.arrayContaining(expectedArr))
    })
  })
  describe('GET, when token is not present', () => {
    test('responds with a 401', async () => {
      const response = await request(app)
        .get('/pets')
        .set('Authorization', '123')
        .send({})
      expect(response.status).toEqual(401)
    })
  })
  describe('Index', () => {
    test('should return a 500 status error if there is an error', async () => {
      // Arrange
      const req = { user_id: 123 }
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }
      const expectedError = new Error('Test error')
      jest.spyOn(User, 'find').mockRejectedValue(expectedError)
      const mockJsonWebToken = jest.fn()
      TokenGenerator.jsonwebtoken = mockJsonWebToken
      // Act
      await PetsController.Index(req, res)

      // Assert
      expect(User.find).toHaveBeenCalledTimes(1)
      expect(mockJsonWebToken).not.toHaveBeenCalled()
      expect(res.status).toHaveBeenCalledWith(500)
      expect(res.json).toHaveBeenCalledWith({ error: expectedError.message })
    })
  })
})
