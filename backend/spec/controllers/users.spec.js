import { app } from '../../app'
import request from 'supertest'
import '../mongodb_helper'

import { User } from '../../models/user'

describe('/users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  describe('POST, when email and password provided are valid', () => {
    test('the response code is 201 and returns a message to say signup has been successful', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          firstName: 'Poppy',
          lastName: 'One',
          email: 'poppy@email.com',
          password: '1234',
          postcode: 'W13 3LX'
        })
      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({
        message: 'Thanks! your account has been successfully created'
      })
    })

    test('a user is created', async () => {
      await request(app)
        .post('/users')
        .send({
          firstName: 'Scarlett',
          lastName: 'Two',
          email: 'scarlett@email.com',
          password: '1234',
          postcode: 'SW5 2NL'
        })
      const users = await User.find()
      const newUser = users[users.length - 1]
      console.log(users)
      expect(newUser.email).toEqual('scarlett@email.com')
    })
  })

  describe('POST, when password is missing', () => {
    test('response code is 400 and returns error message', async () => {
      const response = await request(app)
        .post('/users')
        .send({ firstName: 'Sky', lastName: 'Three', email: 'skye@email.com', postcode: 'E8 8SW' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message: 'User validation failed: password: required'
      })
    })

    test('does not create a user', async () => {
      await request(app).post('/users').send({ email: 'skye@email.com' })
      const users = await User.find()
      expect(users.length).toEqual(0)
    })
  })

  describe('POST, when email is missing', () => {
    test('response code is 400 and returns error message', async () => {
      const response = await request(app)
        .post('/users')
        .send({ firstName: 'Sky', lastName: 'Three', password: '1234', postcode: 'E8 8SW' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message: 'User validation failed: email: required'
      })
    })

    test('does not create a user', async () => {
      await request(app).post('/users').send({ password: '1234' })
      const users = await User.find()
      expect(users.length).toEqual(0)
    })
  })

  describe('POST, when email is invalid', () => {
    test('response code is 400 and it returns an error message', async () => {
      const response = await request(app)
        .post('/users')
        .send({ firstName: 'Sky', lastName: 'Three', email: 'helloworld', password: '1234', postcode: 'E8 8SW' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message:
                    'User validation failed: email: Please use a valid email address'
      })
    })
  })

  describe('POST, when password length does not meet the minimun required length', () => {
    test('response code is 400 and it returns an error message', async () => {
      const response = await request(app)
        .post('/users')
        .send({ firstName: 'Sky', lastName: 'Three', email: 'sky@yahoo.com', password: '1', postcode: 'E8 8SW' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message:
                    'User validation failed: password: must be at least 4 characters long'
      })
    })
  })

  describe('POST, when password length exceeds the maximum length', () => {
    test('response code is 400', async () => {
      const response = await request(app)
        .post('/users')
        .send({
          firstName: 'Sky',
          lastName: 'Three',
          email: 'sky@yahoo.com',
          password: 'ThisPasswordExceedsTheMaxPasswordLength',
          postcode: 'E8 8SW'
        })
      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        message:
                    'User validation failed: password: Path `password` (`ThisPasswordExceedsTheMaxPasswordLength`) is longer than the maximum allowed length (10).'
      })
    })
  })
})
