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
      description:
        'Locale for the input that formats the displayed value. This is applied when the component is not focused',
    },
    value: {
      description: 'Controlled value of the input',
      control: {
        type: 'number',
      },
      defaultValue: 1000,
    },
    onValueChange: {
      description: 'Callback for the value change',
      control: {
        type: 'function',
      },
    },
    width: {
      description: 'Width of the input, in this case affecting the width of the container',
      defaultValue: '512',
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof MoneyInput>

const MoneyInputParentComponent = ({ ...args }) => {
  const [value, setValue] = useState(0)
  const handleSetValue = (value: number) => {
    setValue(value)
  }
  return (
    <div style={{ width: `${args.width}px` }}>
      <MoneyInput title="Label" {...args} value={value} onValueChange={handleSetValue} />
    </div>
  )
}

//This is more the typical usage of the component
export const Default = ({ ...args }) => {
  return <MoneyInputParentComponent {...args} />
}

// Created this to demonstrate the Input
// updating on change of the value prop
export const ControlledByStoryBook = ({ ...args }) => {
  return (
    <div style={{ width: '512px' }}>
      <MoneyInput
        value={args.value || 0}
        onValueChange={(value) => console.log('value changed', value)}
        title={args.title || 'Label'}
        {...args}
      />
    </div>
  )
}
