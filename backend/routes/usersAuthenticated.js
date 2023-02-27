import express from "express";

import { UsersController } from "../controllers/users.js";

export const usersAuthenticatedRouter = express.Router();

usersAuthenticatedRouter.get("/", UsersController.FindUserByToken);

usersAuthenticatedRouter.put("/", UsersController.Update);
