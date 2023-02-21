import {tokensRouter} from "./routes/tokens.js";
import express from "express";
import path from "path";
import logger from "morgan";
import {catch404, errorHandler, tokenChecker} from "./expresssMiddleware.js";
import "./utils.js"
import {usersRouter} from "./routes/users.js";
import {postsRouter} from "./routes/posts.js";

export const app = express();
// setup for receiving JSON
app.use(express.json())
app.use(logger("dev"));
app.use(express.static(path.join(process.cwd(), "public")));

// middleware function to check for valid tokens

// route setup
app.use("/posts", tokenChecker,postsRouter);
app.use("/tokens", tokensRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(catch404);

// error handler
app.use(errorHandler);
// hi
if(process.env.NODE_ENV !== "test") {
    app.listen(process.env.PORT)
}
