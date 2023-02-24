import '../mongodb_helper'
import { Pet } from '../../models/pet'
import { beforeEach, describe, it } from '@jest/globals'

describe('Pet model', () => {
  beforeEach(async () => {
    await Pet.deleteMany({})
  })

  it('has a name, weight, age, description and gender', () => {
    const pet = new Pet({
      name: 'Henry the Hound',
      weight: 12,
      age: 6,
      description: 'I like long walks with friends and eating my owners food.',
      gender: 'Male'
    }
    )
    expect(pet.name).toEqual('Henry the Hound')
    expect(pet.weight).toEqual(12)
    expect(pet.age).toEqual(6)
    expect(pet.description).toEqual('I like long walks with friends and eating my owners food.')
    expect(pet.gender).toEqual('Male')
  })
})
