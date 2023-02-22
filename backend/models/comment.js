import mongoose from "mongoose";

export const CommentSchema = new mongoose.Schema({
  comment: String,
  post_id: String,
  user_id: String,
}, { timestamps: true });

export let Comment = mongoose.model("Comment", CommentSchema);
