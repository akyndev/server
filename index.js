import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routes/todo.js";
import userRouter from "./routes/user.js";

dotenv.config();
const app = express();
const Port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/v1", todoRouter);
app.use("/api/v1/auth", userRouter)
app.all("*", (req, res) => {
  res.json({ msg: "Page you're looking for doesn't exist" })
})

mongoose.set('strictQuery', true)
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() =>
    app.listen(Port, () => console.log(`server running on port: ${Port}..`))
  )
  .catch((error) => console.log(error));
