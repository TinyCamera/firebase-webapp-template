import React from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { TodoList } from "../features/todos/components/TodoList";

export const TodosPage: React.FC = () => {
  return (
    <MainLayout>
      <TodoList />
    </MainLayout>
  );
};

export default TodosPage;
