import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose
    .connection
    .on("error", console.error.bind(console, "MongoDB connection error:"));

