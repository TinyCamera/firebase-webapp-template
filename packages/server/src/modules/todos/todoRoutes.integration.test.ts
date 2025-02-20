import request from "supertest";
import * as admin from "firebase-admin";
import { API_BASE, initializeFirebase } from "../../test/testUtils";

import { Todo } from "./todoModel";
import { Timestamp } from "firebase-admin/firestore";

const TODOS_API = `${API_BASE}/v1/todos`;

describe("Todo API Integration Tests", () => {
  let db: admin.firestore.Firestore;
  let todosCollection: admin.firestore.CollectionReference;

  beforeAll(async () => {
    db = await initializeFirebase();
    todosCollection = db.collection("todos");
  });

  // Helper function to clear all todos
  const clearTodos = async (): Promise<void> => {
    const snapshot = await todosCollection.get();
    await Promise.all(
      snapshot.docs.map((doc) => todosCollection.doc(doc.id).delete())
    );
  };

  beforeEach(async () => {
    await clearTodos();
  });

  describe("GET /todos", () => {
    it("should return empty array when no todos exist", async () => {
      const response = await request(TODOS_API).get("/");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it("should return all todos", async () => {
      // Create test todos directly in Firestore
      const titles = ["Test Todo 1", "Test Todo 2"];
      const now = admin.firestore.Timestamp.now();

      const createdTodos = await Promise.all(
        titles.map(async (title) => {
          const docRef = await todosCollection.add({
            title,
            completed: false,
            createdAt: now,
            updatedAt: now,
          });
          return { id: docRef.id, title };
        })
      );

      const response = await request(TODOS_API).get("/");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(2);
      expect(response.body.data.map((todo: Todo) => todo.title)).toEqual(
        expect.arrayContaining(titles)
      );
      expect(response.body.data.map((todo: Todo) => todo.id)).toEqual(
        expect.arrayContaining(createdTodos.map((t) => t.id))
      );
    });
  });

  describe("POST /todos", () => {
    it("should create a new todo", async () => {
      const title = "New Todo";

      const response = await request(TODOS_API).post("/").send({ title });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(title);
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data.id).toBeTruthy();

      // Verify todo exists in Firestore
      const doc = await todosCollection.doc(response.body.data.id).get();
      expect(doc.exists).toBe(true);
      expect(doc.data()?.title).toBe(title);
    });

    it("should validate empty title", async () => {
      const response = await request(TODOS_API).post("/").send({ title: "" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should validate title length", async () => {
      const response = await request(TODOS_API)
        .post("/")
        .send({ title: "a".repeat(101) });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /todos/:id", () => {
    it("should return a specific todo", async () => {
      // Create test todo
      const title = "Test Todo";
      const now = admin.firestore.Timestamp.now();
      const docRef = await todosCollection.add({
        title,
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const response = await request(TODOS_API).get(`/${docRef.id}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(docRef.id);
      expect(response.body.data.title).toBe(title);
    });

    it("should handle non-existent todo", async () => {
      const response = await request(TODOS_API).get("/nonexistent-id");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /todos/:id", () => {
    it("should update todo title", async () => {
      // Create test todo
      const now = Timestamp.now();
      const docRef = await todosCollection.add({
        title: "Original Title",
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const response = await request(TODOS_API)
        .put(`/${docRef.id}`)
        .send({ title: "Updated Title" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("Updated Title");

      // Verify update in Firestore
      const doc = await todosCollection.doc(docRef.id).get();
      expect(doc.data()?.title).toBe("Updated Title");
    });

    it("should update todo completion status", async () => {
      // Create test todo
      const now = Timestamp.now();
      const docRef = await todosCollection.add({
        title: "Test Todo",
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const response = await request(TODOS_API)
        .put(`/${docRef.id}`)
        .send({ completed: true });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.completed).toBe(true);
    });

    it("should handle updating non-existent todo", async () => {
      const response = await request(TODOS_API)
        .put("/nonexistent-id")
        .send({ title: "Updated Title" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /todos/:id", () => {
    it("should delete a todo", async () => {
      // Create test todo
      const now = Timestamp.now();
      const docRef = await todosCollection.add({
        title: "Test Todo",
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const response = await request(TODOS_API).delete(`/${docRef.id}`);

      expect(response.status).toBe(204);

      // Verify deletion in Firestore
      const doc = await todosCollection.doc(docRef.id).get();
      expect(doc.exists).toBe(false);
    });

    it("should handle deleting non-existent todo", async () => {
      const response = await request(TODOS_API).delete("/nonexistent-id");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
