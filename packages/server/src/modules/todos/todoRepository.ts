import * as admin from "firebase-admin";
import { db } from "../../firebase";
import { Todo, CreateTodoDTO, UpdateTodoDTO, TodoDocument } from "./todoModel";
import { NotFoundError } from "../errors/customErrors";
import { Timestamp } from "firebase-admin/firestore";

export class TodoRepository {
  private collection: admin.firestore.CollectionReference;

  constructor() {
    this.collection = db.collection("todos");
  }

  // Convert Firestore document to Todo model
  private toModel(id: string, data: admin.firestore.DocumentData): Todo {
    return {
      id,
      title: data.title,
      completed: data.completed,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }

  async findAll(): Promise<Todo[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => this.toModel(doc.id, doc.data()));
  }

  async findById(id: string): Promise<Todo> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundError(`Todo with id ${id} not found`);
    }
    return this.toModel(doc.id, doc.data()!);
  }

  async create(data: CreateTodoDTO): Promise<Todo> {
    const now = Timestamp.now();
    const todoData: TodoDocument = {
      title: data.title,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    const docRef = await this.collection.add(todoData);
    const doc = await docRef.get();
    return this.toModel(doc.id, doc.data()!);
  }

  async update(id: string, data: UpdateTodoDTO): Promise<Todo> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundError(`Todo with id ${id} not found`);
    }

    const updates = {
      ...data,
      updatedAt: Timestamp.now(),
    };

    await docRef.update(updates);

    const updatedDoc = await docRef.get();
    return this.toModel(updatedDoc.id, updatedDoc.data()!);
  }

  async delete(id: string): Promise<void> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new NotFoundError(`Todo with id ${id} not found`);
    }

    await docRef.delete();
  }
}
