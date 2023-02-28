import { TokenGenerator } from '../models/token_generator.js'
import { User } from '../models/user.js'

const updateUser = (userId, obj, res, req) => {
  User.updateOne(
    { _id: userId },
    {
      // the pets property is an array of objects rather than a single object
      $set: obj
    },
    async (err) => {
      if (err) {
        res.status(400).json({ message: 'Bad request' })
      }
    }
  )
}
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
  },
  RequestMeetup: (req, res) => {
    try {
      const requester_user_id = req?.user_id
      const pet = req.body.pet
      delete req.body.pet.user_id
      const { user_id: owner_user_id, _id: pet_id } = req.body.pet
      User.updateOne(
        { _id: requester_user_id },
        {
          // the pets property is an array of objects rather than a single object
          $set: { meetPartner: owner_user_id }
        },
        async (err) => {
          if (err) {
            res.status(400).json({ message: 'Bad request' })
          }
        }
      )

      User.updateOne(
        { _id: owner_user_id },
        {
          // the pets property is an array of objects rather than a single object
          $set: { meetPartner: requester_user_id }
        },
        async (err) => {
          if (err) {
            res.status(400).json({ message: 'Bad request' })
          }
        }
      )
      const query = { 'pets._id': pet_id }
      const updateDocument = {
        $set: { 'pets.requested': true }
      }
      User.updateOne(
        query,
        updateDocument,
        {}, async (err) => {
          if (err) {
            res.status(400).json({ message: 'Bad request 3' })
          } else {
            const token = await TokenGenerator.jsonwebtoken(req.user_id)
            res.status(200).json({ token, message: 'OK', pet })
          }
        }
      )
      // await updateUser(owner_user_id, { $set: { meetPartner: requester_user_id } }, res, req)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}
