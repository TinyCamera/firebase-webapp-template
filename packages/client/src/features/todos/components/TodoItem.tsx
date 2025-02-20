import React from "react";
import { Todo } from "../types";
import { Paper, Stack, Checkbox, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, mb: 1 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" spacing={1}>
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id, !todo.completed)}
            size="small"
          />
          <Typography
            sx={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "text.disabled" : "text.primary",
            }}
          >
            {todo.title}
          </Typography>
        </Stack>
        <IconButton
          onClick={() => onDelete(todo.id)}
          size="small"
          color="error"
          aria-label="delete todo"
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Stack>
    </Paper>
  );
};
