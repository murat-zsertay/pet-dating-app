import express from "express";
import {TokensController} from "../controllers/tokens.js";

export const tokensRouter = express.Router();

tokensRouter.post("/", TokensController.Create);

