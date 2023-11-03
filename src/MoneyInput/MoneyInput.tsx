import { useState } from 'react'

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  locale?: string
  error?: boolean
  onValueChange: (value: string) => void
  value: string
  title: string
}

export default function MoneyInput({
  locale,
  error = false,
  value,
  onValueChange,
  title,
  ...props
}: MoneyInputProps): JSX.Element {
  const [inputValue, setInputValue] = useState<string>(value)

  const localeFormatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    const cleanedValue = value.replace(/[^\d.,-]/g, '')
    setInputValue(cleanedValue)
    onValueChange(cleanedValue)
  }

  const handleBlur = () => {
    const formattedValue = localeFormatter.format(Number(inputValue))
    setInputValue(formattedValue)
  }

  return (
    <form>
      <label htmlFor="money-input">{title}</label>
      <input onBlur={handleBlur} value={inputValue} onChange={handleChange} {...props} />
    </form>
  )
}
