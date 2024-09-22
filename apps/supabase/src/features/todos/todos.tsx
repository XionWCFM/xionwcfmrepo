"use client";
import { Suspense, wrap } from "@suspensive/react";
import { SuspenseQuery } from "@suspensive/react-query";
import { useDebouncedInputValue } from "@xionwcfm/react";
import { Box, Button, Flex, Stack, UnderlineInput } from "@xionwcfm/xds";
import { todosQueryOptions } from "./api/todos-query-options";
import { useTodoCreateMutation } from "./api/use-create-todo-mutation";
import { Todo } from "./todo";
export const Todos = () => {
  const input = useDebouncedInputValue("", { delay: 1000 });
  const { mutate: createTodo, isPending } = useTodoCreateMutation();

  return (
    <Stack>
      <UnderlineInput placeholder="serch todo" value={input.value} onChange={(e) => input.onChange(e.target.value)} />

      <Flex my={"16"}>
        <Button
          loading={isPending}
          onClick={() => {
            createTodo({ title: "" });
          }}
          variant={"emphasis"}
          size={"sm"}
        >
          Add Todo
        </Button>
      </Flex>

      <Suspense>
        <SuspenseQuery {...todosQueryOptions.getTodos(input.debouncedValue)}>
          {({ data: todos }) => {
            return (
              <Stack gap={"16"}>
                {todos.map((todo) => (
                  <Todo key={todo.id} {...todo} />
                ))}
              </Stack>
            );
          }}
        </SuspenseQuery>
      </Suspense>
    </Stack>
  );
};
