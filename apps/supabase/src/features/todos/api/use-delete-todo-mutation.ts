import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo } from "actions/todo-actions";
import { TODOS_QUERY_KEYS } from "./todos-query-options";

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => deleteTodo(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: TODOS_QUERY_KEYS.all() });
    },
  });
};
