import { Meta } from '@storybook/react'
import MoneyInput from './MoneyInput'
import { useState } from 'react'

export default {
  //TODO: Fully add story Args
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
  //TODO: Add args to Component eg Value
  const [value, setValue] = useState(0)

  const handleSetValue = (value: number) => {
    setValue(value)
  }
  return (
    <div style={{ width: '512px' }}>
      <MoneyInput title="Label" value={value} onValueChange={handleSetValue} />
    </div>
  )
}
