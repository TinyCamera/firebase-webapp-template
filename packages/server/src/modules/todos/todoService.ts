import { ValidationError } from "../errors/customErrors";
import { Todo, CreateTodoDTO, UpdateTodoDTO } from "./todoModel";
import { TodoRepository } from "./todoRepository";

export class TodoService {
  constructor(private repository: TodoRepository) {}

  private validateTitle(title: string) {
    if (!title || title.trim().length === 0) {
      throw new ValidationError("Todo title is required");
    }
    if (title.length > 100) {
      throw new ValidationError("Todo title must be less than 100 characters");
    }
  }

  async getAllTodos(): Promise<Todo[]> {
    return this.repository.findAll();
  }

  async getTodoById(id: string): Promise<Todo> {
    return this.repository.findById(id);
  }

  async createTodo(data: CreateTodoDTO): Promise<Todo> {
    this.validateTitle(data.title);
    return this.repository.create(data);
  }

  async updateTodo(id: string, data: UpdateTodoDTO): Promise<Todo> {
    if (data.title) {
      this.validateTitle(data.title);
    }
    return this.repository.update(id, data);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
