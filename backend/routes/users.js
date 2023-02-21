import express from "express";

import {UsersController} from "../controllers/users.js";

export const usersRouter = express.Router();

usersRouter.post("/", UsersController.Create);
usersRouter.get("/:user_id", UsersController.FindUserById);


