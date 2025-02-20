import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoForm } from "./TodoForm";
import { TodoItem } from "./TodoItem";
import { TodoFilters } from "./TodoFilters";
import {
  createTodoStart,
  deleteTodoStart,
  fetchTodosStart,
  setFilter,
  updateTodoStart,
} from "../store/todosSlice";
import {
  selectTodosLoading,
  selectTodosFilter,
  selectFilteredTodos,
} from "../store/todosSelectors";

export const TodoList: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectFilteredTodos);
  const loading = useSelector(selectTodosLoading);
  const currentFilter = useSelector(selectTodosFilter);

  useEffect(() => {
    dispatch(fetchTodosStart());
  }, [dispatch]);

  const handleCreateTodo = (title: string) => {
    dispatch(createTodoStart({ title }));
  };

  const handleToggleComplete = (id: string, completed: boolean) => {
    dispatch(updateTodoStart({ id, data: { completed } }));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodoStart(id));
  };

  const handleFilterChange = (filter: "all" | "active" | "completed") => {
    dispatch(setFilter(filter));
  };

  const todosCount = {
    all: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Todo List</h1>

      <TodoForm onSubmit={handleCreateTodo} loading={loading} />

      <TodoFilters
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        todosCount={todosCount}
      />

      <div className="space-y-2">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
          />
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          {loading ? "Loading todos..." : "No todos found"}
        </p>
      )}
    </div>
  );
};
