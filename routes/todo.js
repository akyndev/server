import express from "express";
import {
  getAllTodo,
  createTodo,
  updateTodo,
  getSingleTodo,
  deleteTodo,
} from "../controllers/todo.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/todo")
  .get( getAllTodo)
  .post(authMiddleware, createTodo);
router
  .route("/todo/:id")
  .patch(authMiddleware, updateTodo)
  .get(authMiddleware, getSingleTodo)
  .delete(authMiddleware, deleteTodo);

export default router;
