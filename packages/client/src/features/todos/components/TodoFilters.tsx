import React from "react";

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
    <div className="flex justify-center space-x-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentFilter === key
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {label}
          <span
            className={`ml-2 px-2 py-1 text-xs rounded-full ${
              currentFilter === key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {count}
          </span>
        </button>
      ))}
    </div>
  );
};
