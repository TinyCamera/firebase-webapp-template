import * as admin from "firebase-admin";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: admin.firestore.Timestamp;
  updatedAt: admin.firestore.Timestamp;
}

export interface CreateTodoDTO {
  title: string;
}

export interface UpdateTodoDTO {
  title?: string;
  completed?: boolean;
}

// Firestore document without the id
export type TodoDocument = Omit<Todo, "id">;
