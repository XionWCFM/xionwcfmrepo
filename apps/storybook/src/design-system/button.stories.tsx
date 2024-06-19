import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@xionwcfm/ui/button";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  args: { children: "Primary" },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { appName: "Primary", children: "helloworld" },
};
