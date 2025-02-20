import apiClient from "../../../shared/apiClient";
import { CreateTodoDTO, Todo, UpdateTodoDTO } from "../types";

const TODOS_BASE_PATH = "/v1/todos";

export const todosApi = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await apiClient.get(TODOS_BASE_PATH);
    return response.data.data;
  },

  getTodoById: async (id: string): Promise<Todo> => {
    const response = await apiClient.get(`${TODOS_BASE_PATH}/${id}`);
    return response.data.data;
  },

  createTodo: async (data: CreateTodoDTO): Promise<Todo> => {
    const response = await apiClient.post(TODOS_BASE_PATH, data);
    return response.data.data;
  },

  updateTodo: async (id: string, data: UpdateTodoDTO): Promise<Todo> => {
    const response = await apiClient.put(`${TODOS_BASE_PATH}/${id}`, data);
    return response.data.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await apiClient.delete(`${TODOS_BASE_PATH}/${id}`);
  },
};
