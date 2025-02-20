import React from "react";
import { Stack, ToggleButtonGroup, ToggleButton, Chip } from "@mui/material";

interface TodoFiltersProps {
  currentFilter: "all" | "active" | "completed";
  onFilterChange: (filter: "all" | "active" | "completed") => void;
  todosCount: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  todosCount,
}) => {
  const filters: Array<{
    key: "all" | "active" | "completed";
    label: string;
    count: number;
  }> = [
    { key: "all", label: "All", count: todosCount.all },
    { key: "active", label: "Active", count: todosCount.active },
    { key: "completed", label: "Completed", count: todosCount.completed },
  ];

  return (
    <Stack direction="row" justifyContent="center" sx={{ mb: 3 }}>
      <ToggleButtonGroup
        value={currentFilter}
        exclusive
        onChange={(_, value) => value && onFilterChange(value)}
        size="small"
      >
        {filters.map(({ key, label, count }) => (
          <ToggleButton
            key={key}
            value={key}
            sx={{
              px: 2,
              py: 1,
              "&.Mui-selected": {
                color: "white",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            {label}
            <Chip
              label={count}
              size="small"
              sx={{
                ml: 1,
                height: 20,
                "& .MuiChip-label": {
                  px: 1,
                  py: 0.5,
                  fontSize: "0.75rem",
                },
                ...(currentFilter === key && {
                  bgcolor: "primary.dark",
                  color: "white",
                }),
              }}
            />
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Stack>
  );
};
