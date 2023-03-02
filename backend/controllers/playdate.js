import { Playdate } from '../models/playdate.js'
import { TokenGenerator } from '../models/token_generator.js'
import { User } from '../models/user.js'

export const PlaydateController = {
  Create: async (req, res) => {
    const playdateInfo = req.body.playdate_request
    playdateInfo.accepted = 'pending'
    playdateInfo.requestor_user_id = req.user_id
    const newPlaydate = new Playdate(playdateInfo)
    newPlaydate.save(async (err) => {
      if (err) res.status(400).json({ message: err.message })
      else {
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: 'Playdate request sent', token })
      }
    })
  },
  Index: async (req, res) => {
    const user = await User.findById({ _id: req.user_id })
    const userPetIds = user.pets.map(pet => pet._id)
    const requestsMade = await Playdate.find({ requester_pet_id: userPetIds })
    const requestsRecieved = await Playdate.find({ recipient_pet_id: userPetIds })
    const requestsMadeDetails = await Promise.all(requestsMade.map(async (request) => {
      const recipientUser = await User.findById({ _id: request.recipient_user_id })
      const recipientPet = recipientUser.pets.filter(pet => pet._id.toString() === request.recipient_pet_id)[0]
      const requesterPet = user.pets.filter(pet => pet._id.toString() === request.requester_pet_id)[0]
      const requestId = request._id
      const recipientInfo = {
        playdate: request,
        recipientPet,
        requesterPet,
        requestId
      }
      if (request.accepted === 'true') {
        recipientInfo.firstName = recipientUser.firstName
        recipientInfo.email = recipientUser.email
      }
      return recipientInfo
    }))

    const requestsRecievedDetails = await Promise.all(requestsRecieved.map(async (request) => {
      const requestorUser = await User.findById({ _id: request.requestor_user_id })
      const recipientPet = user.pets.filter(pet => pet._id.toString() === request.recipient_pet_id)[0]
      const requesterPet = requestorUser.pets.filter(pet => pet._id.toString() === request.requester_pet_id)[0]
      const requestId = request._id
      const requestorInfo = {
        playdate: request,
        recipientPet,
        requesterPet,
        requestId
      }
      if (request.accepted === 'true') {
        requestorInfo.firstName = requestorUser.firstName
        requestorInfo.email = requestorUser.email
      }
      return requestorInfo
    }))

    const token = await TokenGenerator.jsonwebtoken(req.user_id)
    res.status(200).json({
      requests: { requestsMadeDetails, requestsRecievedDetails }, token
    })
  },
  UpdateRequest: async (req, res) => {
    // const userId = req.user_id
    const requestId = req.body.requestId
    const requestResponse = req.body.answer

    if (!requestId) {
      res
        .status(400)
        .json({ message: `Passed id = ${requestId}, Passed answer = ${requestResponse}` })
      return
    }

    if (requestResponse === 'true') {
      Playdate.updateOne(
        { _id: requestId },
        {
          // the pets property is an array of objects rather than a single object
          $set: { accepted: 'true' }
        },
        async (err) => {
          if (err) {
            res.status(400).json({ message: 'Bad request' })
          } else {
            const token = await TokenGenerator.jsonwebtoken(req.user_id)
            res.status(200).json({ token, message: 'Request accepted' })
          }
        }
      )
    } else {
      Playdate.deleteOne(
        { _id: requestId },
        async (err) => {
          if (err) {
            res.status(400).json({ message: 'Bad request' })
          } else {
            const token = await TokenGenerator.jsonwebtoken(req.user_id)
            res.status(200).json({ token, message: 'Request rejected and deleted' })
          }
        }
      )
    }
  }
}
