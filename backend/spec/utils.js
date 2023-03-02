import { User } from '../models/user.js'
import { faker } from '@faker-js/faker'
import JWT from 'jsonwebtoken'

export class MockMongoDBObject {
  constructor (model, overide = {}) {
    this.model = model
    this.mocks = {
      user: {
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
      },
      playdate: {
        requester_pet_id: faker.random.alpha({ count: 10 }),
        recipient_pet_id: faker.random.alpha({ count: 10 }),
        recipient_user_id: faker.random.alpha({ count: 10 }),
        requestor_user_id: faker.random.alpha({ count: 10 }),
        accepted: faker.datatype.boolean()
      }
    }
    this.overide = overide
  }

  createMongooseEntry = async () => await (this.model).create(this.data)
  createMock = () => {
    this.data = this.mocks[this.model.modelName.toLowerCase()]
    this.data = Object.assign(this.data, this.overide)
    return this.createMongooseEntry()
  }
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
      gender: faker.name.sex(),
      requested: faker.datatype.boolean(),
      profileImage: faker.internet.url()
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
  const user = await User.create(mockUserObject)
  const token = createJWTTOKEN(user.id)
  return { user, token }
}
