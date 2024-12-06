import type { Meta, StoryObj } from "@storybook/react";
import { MainXionWcfm } from "./MainXionWcfm";

const meta = {
  title: "Blog/Main",
  component: MainXionWcfm,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MainXionWcfm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {};
