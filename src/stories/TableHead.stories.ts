import type { Meta, StoryObj } from "@storybook/react";

import { TableHead } from "components";

const meta = {
  title: "Example/TableHead",
  component: TableHead,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
  },
} satisfies Meta<typeof TableHead>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    primary: true,
  },
};

export const Secondary: Story = {
  args: {
    primary: false,
  },
};
