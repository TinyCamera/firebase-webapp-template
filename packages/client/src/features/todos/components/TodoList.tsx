import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Typography, Stack } from "@mui/material";
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
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" sx={{ mb: 4 }}>
        Todo List
      </Typography>

      <TodoForm onSubmit={handleCreateTodo} loading={loading} />

      <TodoFilters
        currentFilter={currentFilter}
        onFilterChange={handleFilterChange}
        todosCount={todosCount}
      />

      <Stack spacing={1}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
          />
        ))}
      </Stack>

      {todos.length === 0 && (
        <Typography
          variant="body1"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          {loading ? "Loading todos..." : "No todos found"}
        </Typography>
      )}
    </Container>
  );
};
