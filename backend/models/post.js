import mongoose from "mongoose";
// TODO: Some of this language will need to be updated
const PostSchema = new mongoose.Schema({
  user_id: String,
  message: { type: String, required: [true, 'required'] },
}, { timestamps: true });

export const Post = mongoose.model("Post", PostSchema);

