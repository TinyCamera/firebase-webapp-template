export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTodoDTO {
  title: string;
}

export interface UpdateTodoDTO {
  title?: string;
  completed?: boolean;
}

export type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  filter: "all" | "active" | "completed";
};
