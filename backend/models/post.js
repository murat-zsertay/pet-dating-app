import mongoose from "mongoose";
import {CommentSchema} from "./comment.js"

mongoose.set('strictQuery', true);

export const PostSchema = new mongoose.Schema({
  user_id: String,
  message: { type: String, required: [true, 'required'] },
  comments: [{type: CommentSchema}],
}, { timestamps: true });

export const Post = mongoose.model("Post", PostSchema);

