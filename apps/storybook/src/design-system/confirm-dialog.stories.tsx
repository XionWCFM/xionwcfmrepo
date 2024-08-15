import type { Meta, StoryObj } from "@storybook/react";
import { Button, ConfirmDialog } from "@xionwcfm/ui";
import { useState } from "react";

const Dialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>click</button>
      <ConfirmDialog
        isOpen={open}
        onClose={() => setOpen(false)}
        title="정말 수락하시겠습니까?"
        description={"여기서의 결정은 \n되돌릴 수 없어요"}
        primaryButton={
          <Button className=" w-full py-12" variant={"primary"} size={"lg"} onClick={() => setOpen(false)}>
            수락하기
          </Button>
        }
        secondaryButton={
          <Button className=" w-full py12" variant={"secondary"} size={"lg"} onClick={() => setOpen(false)}>
            취소하기
          </Button>
        }
      />
    </div>
  );
};

const meta: Meta<typeof Dialog> = {
  title: "Xds/ConfrimDialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof Dialog>;

export const ConfirmDialogStory: Story = {
  args: {},
  decorators: [
    () => (
      <div className=" flex flex-col">
        <Dialog />
      </div>
    ),
  ],
};
