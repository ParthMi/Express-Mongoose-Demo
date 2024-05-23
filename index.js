const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pm:vpiRjg9KypZG0hjj@cluster0.znqbof7.mongodb.net", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Mongoose connected");
}).catch((error) => {
    console.log("Error connecting to MongoDB:", error);
});

const app = express();

app.use(express.json());

app.listen(3000, function () {
    console.log("Server started on port 3000");
});


const postRouter = require("./routes/post");
const userRouter = require("./routes/user");

app.use("/api/post", postRouter);

app.use("/api/user", userRouter);