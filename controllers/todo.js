import Todo from "../models/todo.js";

export const getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ msg: "All Todos", data: todos });
  } catch (error) {
    console.log(error);
  }
};

export const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById({ _id: id });
    if(!todo) {
        return res.status(404).json({ msg: "Can't find the todo" })
    }
    res.status(200).json({ msg: "Here is your single todo", data: todo });
  } catch (error) {
    console.log(error);
  }
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  console.log(req.user);
  try {
    if (!title || !description) {
      return res.status(400).json({ msg: "Please Provide all inputs" });
    }
    const todo = await Todo.create({ title, description, creatorId: req.user.id });
    res.status(201).json({ msg: "Successfully created", data: todo });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const newTodo = await Todo.findByIdAndUpdate({ _id: id }, body);
    const todo = await Todo.findById({ _id: newTodo._id });
    res.status(200).json({ msg: "Successfully updated", data: todo });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    await Todo.findByIdAndDelete({ _id: id });
    res.status(200).json({ msg: "Successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};
