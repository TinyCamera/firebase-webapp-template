import React, { useState } from "react";
import { TextField, Button, Stack, CircularProgress } from "@mui/material";

interface TodoFormProps {
  onSubmit: (title: string) => void;
  loading?: boolean;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, loading }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          disabled={loading}
          size="small"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!title.trim() || loading}
          sx={{ minWidth: 100 }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} color="inherit" />
              Adding...
            </>
          ) : (
            "Add Todo"
          )}
        </Button>
      </Stack>
    </form>
  );
};
