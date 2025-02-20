import request from "supertest";
import {
  API_BASE,
  initializeFirebase,
  withAuth,
  createTestUser,
} from "../../test/testUtils";

import { Todo } from "./todoModel";
import {
  CollectionReference,
  DocumentData,
  Firestore,
  Timestamp,
} from "firebase-admin/firestore";

const TODOS_API = `${API_BASE}/v1/todos`;

describe("Todo API Integration Tests", () => {
  let db: Firestore;
  let todosCollection: CollectionReference<DocumentData>;
  let testUser: { token: string; userId: string };

  beforeAll(async () => {
    db = await initializeFirebase();

    testUser = await createTestUser();
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
    it("should return 401 when not authenticated", async () => {
      const response = await request(TODOS_API).get("/");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should return empty array when no todos exist", async () => {
      const response = await withAuth(
        request(TODOS_API).get("/"),
        testUser.token
      );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
    });

    it("should return all todos", async () => {
      // Create test todos directly in Firestore
      const titles = ["Test Todo 1", "Test Todo 2"];
      const now = Timestamp.now();

      const createdTodos = await Promise.all(
        titles.map(async (title) => {
          const docRef = await todosCollection.add({
            userId: testUser.userId,
            title,
            completed: false,
            createdAt: now,
            updatedAt: now,
          });
          return { id: docRef.id, title };
        })
      );

      const response = await withAuth(
        request(TODOS_API).get("/"),
        testUser.token
      );

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
    it("should return 401 when not authenticated", async () => {
      const response = await request(TODOS_API)
        .post("/")
        .send({ title: "Test Todo" });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should create a new todo", async () => {
      const title = "New Todo";

      const response = await withAuth(
        request(TODOS_API).post("/"),
        testUser.token
      ).send({ title });

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
      const response = await withAuth(
        request(TODOS_API).post("/"),
        testUser.token
      ).send({ title: "" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should validate title length", async () => {
      const response = await withAuth(
        request(TODOS_API).post("/"),
        testUser.token
      ).send({ title: "a".repeat(101) });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /todos/:id", () => {
    it("should return 401 when not authenticated", async () => {
      const response = await request(TODOS_API).get("/some-id");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should return a specific todo", async () => {
      // Create test todo
      const title = "Test Todo";
      const now = Timestamp.now();
      const docRef = await todosCollection.add({
        userId: testUser.userId,
        title,
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const response = await withAuth(
        request(TODOS_API).get(`/${docRef.id}`),
        testUser.token
      );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(docRef.id);
      expect(response.body.data.title).toBe(title);
    });

    it("should handle non-existent todo", async () => {
      const response = await withAuth(
        request(TODOS_API).get("/nonexistent-id"),
        testUser.token
      );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /todos/:id", () => {
    it("should return 401 when not authenticated", async () => {
      const response = await request(TODOS_API)
        .put("/some-id")
        .send({ title: "Updated Title" });

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should update todo title", async () => {
      // Create test todo
      const now = Timestamp.now();
      const docRef = await todosCollection.add({
        userId: testUser.userId,
        title: "Original Title",
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const response = await withAuth(
        request(TODOS_API).put(`/${docRef.id}`),
        testUser.token
      ).send({ title: "Updated Title" });

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
        userId: testUser.userId,
        title: "Test Todo",
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const response = await withAuth(
        request(TODOS_API).put(`/${docRef.id}`),
        testUser.token
      ).send({ completed: true });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.completed).toBe(true);
    });

    it("should handle updating non-existent todo", async () => {
      const response = await withAuth(
        request(TODOS_API).put("/nonexistent-id"),
        testUser.token
      ).send({ title: "Updated Title" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /todos/:id", () => {
    it("should return 401 when not authenticated", async () => {
      const response = await request(TODOS_API).delete("/some-id");

      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
    });

    it("should delete a todo", async () => {
      // Create test todo
      const now = Timestamp.now();
      const docRef = await todosCollection.add({
        userId: testUser.userId,
        title: "Test Todo",
        completed: false,
        createdAt: now,
        updatedAt: now,
      });

      const response = await withAuth(
        request(TODOS_API).delete(`/${docRef.id}`),
        testUser.token
      );

      expect(response.status).toBe(204);

      // Verify deletion in Firestore
      const doc = await todosCollection.doc(docRef.id).get();
      expect(doc.exists).toBe(false);
    });

    it("should handle deleting non-existent todo", async () => {
      const response = await withAuth(
        request(TODOS_API).delete("/nonexistent-id"),
        testUser.token
      );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });
});
