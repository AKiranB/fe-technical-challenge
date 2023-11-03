import { Meta } from '@storybook/react'
import MoneyInput from './MoneyInput'
import { useState } from 'react'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    value: {
      control: {
        type: 'number',
      },
      default: 0,
    },
  },
} satisfies Meta<typeof MoneyInput>

export const MoneyInputComponent = () => {
  const [value, setValue] = useState(0)
  return <MoneyInput title="Money Input" value={value} onValueChange={setValue} />
}
