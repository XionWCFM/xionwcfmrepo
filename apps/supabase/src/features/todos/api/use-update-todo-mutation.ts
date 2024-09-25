import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo } from "actions/todo-actions";
import { TODOS_QUERY_KEYS } from "./todos-query-options";

export const useUpdateTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, title, completed }: { id: number; title?: string; completed?: boolean }) =>
      updateTodo({
        id,
        title,
        completed,
      }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all() });
    },
  });
};