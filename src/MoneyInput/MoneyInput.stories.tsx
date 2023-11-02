import { Meta } from '@storybook/react'
import MoneyInput from './MoneyInput'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies Meta<typeof MoneyInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default = {}
