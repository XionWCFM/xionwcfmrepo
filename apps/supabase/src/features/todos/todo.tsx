"use client";

import { useDraft } from "@xionwcfm/react";
import { Button, Flex, Input, Paragraph, Stack } from "@xionwcfm/xds";
import { TodoRow } from "actions/todo-actions";
import { useDeleteTodoMutation } from "./api/use-delete-todo-mutation";
import { useUpdateTodoMutation } from "./api/use-update-todo-mutation";

export const Todo = (todo: TodoRow) => {
  const [title, setTitle] = useDraft(todo.title);
  const { mutate: updateTodo } = useUpdateTodoMutation();
  const { mutate: deleteTodo } = useDeleteTodoMutation();

  const isEditing = title !== todo.title;
  return (
    <Flex>
      <Stack mr={"16"}>
        <Paragraph>원본 내용 : {todo.title}</Paragraph>
        <Paragraph>완료 여부 : {todo.completed ? "완료" : "미완료"}</Paragraph>
      </Stack>

      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <input
        type="checkbox"
        onChange={(e) => {
          const isDiffrence = e.target.checked !== todo.completed;
          if (isDiffrence) {
            updateTodo({ id: todo.id, completed: e.target.checked });
          }
        }}
      />

      <Button
        variant={"emphasis"}
        size={"sm"}
        onClick={() => {
          if (isEditing) {
            updateTodo({ title, id: todo.id });
          }
        }}
      >
        수정하기
      </Button>

      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => {
          deleteTodo(todo.id);
        }}
      >
        지우기
      </Button>
    </Flex>
  );
};
