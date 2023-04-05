import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "components";

const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddMode: Story = {
  args: {
    mode: "add",
    label: "+",
    disabled: false,
  },
};

export const CancelMode: Story = {
  args: {
    mode: "cancel",
    label: "x",
    disabled: false,
  },
};
export const RemoveMode: Story = {
  args: {
    mode: "remove",
    label: "-",
    disabled: false,
  },
};
