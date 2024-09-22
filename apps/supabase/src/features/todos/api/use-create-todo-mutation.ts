import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo } from "actions/todo-actions";
import { TODOS_QUERY_KEYS } from "./todos-query-options";

export const useTodoCreateMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ title, completed = false }: { title: string; completed?: boolean }) =>
      createTodo({ title, completed }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all() });
    },
  });
};
