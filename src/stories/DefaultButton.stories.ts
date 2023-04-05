import type { Meta, StoryObj } from "@storybook/react";

import { DefaultButton } from "components";

const meta = {
  title: "Example/DefaultButton",
  component: DefaultButton,
  tags: ["autodocs"],
} satisfies Meta<typeof DefaultButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
