"use client";
import { queryOptions } from "@tanstack/react-query";
import { getTodos } from "actions/todo-actions";

export const TODOS_QUERY_KEYS = {
  all: () => ["all-todo"],
  allGetTodos: () => [...TODOS_QUERY_KEYS.all(), "get-todos"],
  getTodos: (input: string) => [...TODOS_QUERY_KEYS.allGetTodos(), input],
};

export const todosQueryOptions = {
  getTodos: (input: string) =>
    queryOptions({
      queryKey: TODOS_QUERY_KEYS.all(),
      queryFn: async () => {
        return getTodos({ searchInput: input });
      },
    }),
};
