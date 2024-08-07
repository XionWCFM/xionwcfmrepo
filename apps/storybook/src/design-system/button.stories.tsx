import type { Meta, StoryObj } from "@storybook/react";
import { FillInfoIcon } from "@xionwcfm/icon/fill-info-icon";
import { Button } from "@xionwcfm/ui/button";

const options = ["default", "outline", "primary", "secondary", "ghost", "link", "icon"] as const;
const withOutIcon = options.filter((item) => item !== "icon");

const meta: Meta<typeof Button> = {
  title: "Xds/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Primary" },
  argTypes: {
    variant: {
      control: "select",
      options: options,
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "full"],
    },
    loading: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Buttons: Story = {
  args: { appName: "Primary", children: "Button" },
  decorators: [
    (Story) => (
      <div className=" px-16 py-16">
        <div className=" mb-36">
          <Story />
        </div>
        {withOutIcon.map((variant) => (
          <div className=" py-12 gap-y-16 flex flex-col" key={variant}>
            <p className=" text-size-8 font-bold">{`${variant} case`}</p>
            <div className=" flex gap-x-16">
              <Button variant={variant} size={"sm"}>
                Button
              </Button>
              <Button variant={variant} size={"lg"}>
                Button
              </Button>
            </div>
            <div className=" flex items-center gap-x-16">
              <Button startIcon={<FillInfoIcon />} variant={variant} size={"sm"}>
                Button
              </Button>
              <Button startIcon={<FillInfoIcon />} variant={variant} loading size={"sm"}>
                Button
              </Button>
              <Button endIcon={<FillInfoIcon />} variant={variant} size={"sm"}>
                Button
              </Button>
              <Button startIcon={<FillInfoIcon />} endIcon={<FillInfoIcon />} variant={variant} size={"sm"}>
                Button
              </Button>
            </div>

            <div>
              <Button variant={variant} size={"full"}>
                Button
              </Button>
            </div>
          </div>
        ))}
        <div>
          <Button variant={"icon"} size={"icon"}>
            <FillInfoIcon />
          </Button>
        </div>
      </div>
    ),
  ],
};
