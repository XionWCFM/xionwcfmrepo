import type { Meta, StoryObj } from "@storybook/react";
import { DialogPrimitives } from "@xionwcfm/ui";

const Dialog = () => {
  return (
    <div>
      <DialogPrimitives.Root>
        <DialogPrimitives.Trigger>withOverlay</DialogPrimitives.Trigger>
        <DialogPrimitives.Portal>
          <DialogPrimitives.Overlay />
          <DialogPrimitives.Content>hello</DialogPrimitives.Content>
        </DialogPrimitives.Portal>
      </DialogPrimitives.Root>
    </div>
  );
};

const meta: Meta<typeof Dialog> = {
  title: "Xds/Dialog",
  component: Dialog,
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof Dialog>;

export const DialogPrimitive: Story = {
  args: {},
  decorators: [
    () => (
      <div className=" min-h-screen p-16 flex flex-col">
        <Dialog />
      </div>
    ),
  ],
};
