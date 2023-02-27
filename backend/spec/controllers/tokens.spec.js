import { app } from '../../app'
import '../mongodb_helper'
import request from 'supertest'
import { User } from '../../models/user'

describe('/tokens', () => {
  afterAll(async () => {
    await User.deleteMany({})
  })

  test('a token is returned when creds are valid', async () => {
    await User.create({
      firstName: 'some',
      lastName: 'one',
      email: 'test@tokens.com',
      password: '12345678',
      postcode: 'N19 0BG'
    })
    const response = await request(app)
      .post('/tokens')
      .send({ email: 'test@tokens.com', password: '12345678' })
    expect(response.status).toEqual(201)
    expect(response.body.token).not.toEqual(undefined)
    expect(response.body.message).toEqual('OK')
  })

  test('a token is not returned when creds are invalid', async () => {
    const response = await request(app)
      .post('/tokens')
      .send({ email: 'test@test.com', password: '12345' })
    expect(response.status).toEqual(401)
    expect(response.body.token).toEqual(undefined)
    expect(response.body.message).toEqual('auth error')
  })
})
