import { TokenGenerator } from '../models/token_generator.js'
import { User } from '../models/user.js'

export const PetsController = {
  Index: async (req, res) => {
    try {
      const users = await User.find({})
      const userList = users.map(user => user.toObject())
      const pets = userList.reduce((acc, { pets, _id: userId }) => {
        const petsWithUserId = pets.map((pet) => ({ ...pet, user_id: userId }))
        return [...acc, ...petsWithUserId]
      }, [])
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ pets, token })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
