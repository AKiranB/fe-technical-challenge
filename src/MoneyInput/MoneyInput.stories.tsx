import { Meta } from '@storybook/react'
import MoneyInput from './MoneyInput'
import { useState } from 'react'

export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Label for the input',
      control: {
        type: 'text',
      },
    },
    disabled: {
      description: 'Disable the input',
      control: {
        type: 'boolean',
      },
    },
    error: {
      description: 'Enable the Inputs Error state',
      control: {
        type: 'boolean',
      },
    },
    locale: {
      description: 'Locale for the input that formats the displayed value',
    },
    value: {
      description: 'Controlled value of the input',
      control: {
        type: 'number',
      },
    },
    onValueChange: {
      description: 'Callback for the value change',
      control: {
        type: 'function',
      },
    },
  },
} satisfies Meta<typeof MoneyInput>

export const Default = ({ ...args }) => {
  const [value, setValue] = useState(500)

  const handleSetValue = (value: number) => {
    console.log('in hte parent', value)
    setValue(value)
  }
  return (
    <div style={{ width: '512px' }}>
      <MoneyInput title="Label" {...args} value={value} onValueChange={handleSetValue} />
    </div>
  )
}
