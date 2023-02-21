import express from "express";
import { PostsController } from "../controllers/posts.js";

export const postsRouter = express.Router();

postsRouter.get("/:post_id", PostsController.FindPostById);
postsRouter.get("/", PostsController.Index);
postsRouter.post("/", PostsController.FormHandler, PostsController.Create);
