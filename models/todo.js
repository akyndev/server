import mongoose, { model, Schema } from "mongoose";

const todoSchema = new Schema({
    title: String,
    description: String,
    creatorId: String,
}, { timestamps: true })

const Todo = model('Todo', todoSchema)

export default Todo