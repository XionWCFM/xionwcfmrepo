import type { Meta, StoryObj } from "@storybook/react";
import { ConfirmDialog } from "@xionwcfm/ui";
import React, { useState } from "react";

const Dialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>click</button>
      <ConfirmDialog isOpen={open} onClose={() => setOpen(false)} />
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

export const Drawers: Story = {
  args: {},
  decorators: [
    () => (
      <div className=" flex flex-col">
        <Dialog />
      </div>
    ),
  ],
};
