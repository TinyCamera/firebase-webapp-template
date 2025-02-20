import express from "express";
import { TodoController } from "./todoController";
import { TodoService } from "./todoService";
import { TodoRepository } from "./todoRepository";

const router = express.Router();

// Initialize dependencies
const todoRepository = new TodoRepository();
const todoService = new TodoService(todoRepository);
const todoController = new TodoController(todoService);

// Routes
router.get("/", todoController.getTodos);
router.get("/:id", todoController.getTodoById);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

export default router;
