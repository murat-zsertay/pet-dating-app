import mongoose from 'mongoose'

const PlaydateSchema = new mongoose.Schema(
  {
    requester_pet_id: {
      type: String,
      required: [true, 'required']
    },
    recipient_pet_id: {
      type: String,
      required: [true, 'required']
    },
    recipient_user_id: {
      type: String,
      required: [true, 'required']
    },
    requestor_user_id: {
      type: String,
      required: [true, 'required']
    },
    accepted: {
      type: String,
      required: [true, 'required']
    }
  },
  { timestamps: true }
)
export const Playdate = mongoose.model('Playdate', PlaydateSchema)
