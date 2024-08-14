import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "@xionwcfm/ui/drawer";

const ExampleDrawer = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger>trigger</Drawer.Trigger>
      <Drawer.Content className=" ">
        <div className={`h-screen  `}>
          <Drawer.Header>Drawer Header</Drawer.Header>
          <Drawer.Footer>Drawer Footer</Drawer.Footer>
        </div>
      </Drawer.Content>
    </Drawer.Root>
  );
};

const meta: Meta<typeof Drawer> = {
  title: "Xds/Drawer",
  component: ExampleDrawer,
  tags: ["autodocs"],
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof ExampleDrawer>;

export const Drawers: Story = {
  args: {},
  decorators: [
    () => (
      <div className=" flex flex-col">
        <ExampleDrawer />
      </div>
    ),
  ],
};
