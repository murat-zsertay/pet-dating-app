import mongoose from "mongoose";
import { PetSchema } from "./pet.js";
mongoose.set("strictQuery", true);

const validateEmail = (email) => {
  const emailToCheck = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailToCheck.test(email);
};

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "required"],
      validate: [validateEmail, "Please use a valid email address"],
      unique: true,
    },
    firstName: {
      type: String,
      required: [true, "required"],
    },
    lastName: {
      type: String,
      required: [true, "required"],
    },
    postcode: {
      type: String,
      required: [true, "required"],
    },
    pets: [{ type: PetSchema }],
    password: {
      type: String,
      required: [true, "required"],
      minlength: [4, "must be at least 4 characters long"],
      maxlength: 10,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
