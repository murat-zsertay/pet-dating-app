import mongoose from 'mongoose'

export const PetSchema = new mongoose.Schema(
  {
    name: String,
    weight: Number,
    age: Number,
    description: String,
    gender: String,
    requested: Boolean,
    profileImage: String
  },
  { timestamps: true }
)
export const Pet = mongoose.model('Pet', PetSchema)
