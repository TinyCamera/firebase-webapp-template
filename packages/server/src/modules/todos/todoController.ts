import { Request, Response, NextFunction } from "express";
import { TodoService } from "./todoService";
import { CreateTodoDTO, UpdateTodoDTO } from "./todoModel";

export class TodoController {
  constructor(private service: TodoService) {}

  getTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await this.service.getAllTodos();
      res.json({
        success: true,
        data: todos,
      });
    } catch (error) {
      next(error);
    }
  };

  getTodoById = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todo = await this.service.getTodoById(req.params.id);
      res.json({
        success: true,
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  };

  createTodo = async (
    req: Request<{}, {}, CreateTodoDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todo = await this.service.createTodo(req.body);
      res.status(201).json({
        success: true,
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  };

  updateTodo = async (
    req: Request<{ id: string }, {}, UpdateTodoDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const todo = await this.service.updateTodo(req.params.id, req.body);
      res.json({
        success: true,
        data: todo,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteTodo = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.service.deleteTodo(req.params.id);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };
}
