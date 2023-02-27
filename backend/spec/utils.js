import { User } from '../models/user.js'
import { faker } from '@faker-js/faker'
import JWT from 'jsonwebtoken'

export const addMockObjectToDB = async (model, data) => await model.create(data)

class MockMongoDBObject {
  constructor (model, data) {
    this.model = model
    this.data = data
  }

  async create () {
    return await this.model.create(this.data)
  }
}

const createMockObject = (overide = {}) => {

}
export const createMockUserObject = (overide = {}) => {
  const userObj = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
    postcode: faker.address.zipCode(),
    pets: [{
      name: faker.name.firstName(),
      weight: faker.datatype.number({ min: 3, max: 12 }),
      age: faker.datatype.number({ min: 4, max: 12 }),
      description: faker.lorem.sentence(),
      gender: faker.name.sex()
    }]
  }
  return Object.assign(userObj, overide)
}

export const createJWTTOKEN = user_id => JWT.sign({
  user_id,
  // Backdate this token of 5 minutes
  iat: Math.floor(Date.now() / 1000) - (5 * 60),
  // Set the JWT token to expire in 10 minutes
  exp: Math.floor(Date.now() / 1000) + (10 * 60)
}, process.env.JWT_SECRET)
export const setupMockUser = async () => {
  const mockUserObject = createMockUserObject()
  const user = await addMockObjectToDB(User, mockUserObject)
  const token = createJWTTOKEN(user.id)
  return { user, token }
}
