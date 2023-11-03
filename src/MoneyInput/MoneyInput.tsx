import React, { useState, useEffect } from 'react'

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  //I prefer this to a standard String, because it's more explicit
  locale?: 'de-DE' | 'en-US' | 'fr-FR' | 'nl-NL' | 'es-ES' | 'it-IT' | 'pt-PT'
  error?: boolean
  onValueChange: (value: number) => void
  value: number
  title: string
}

export default function MoneyInput({
  locale = 'de-DE',
  error = false,
  value,
  onValueChange,
  title,
  ...props
}: MoneyInputProps): JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const handleFocus = () => {
    //Converts back to a raw value for editing
    setInputValue((value / 100).toString())
  }

  const handleBlur = () => {
    //This formats the value in the input field
    //OnBlur, I reckon this is better UX
    const formattedValue = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
    }).format(value / 100)
    setInputValue(formattedValue)
    onValueChange(Number(inputValue) * 100)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d.,-]/g, '')
    setInputValue(rawValue)
    const valueInCents = Math.round(Number(rawValue.replace(',', '.')) * 100)
    console.log(`Emitting value in cents: ${valueInCents}`)
    onValueChange(valueInCents)
  }

  return (
    <form>
      <label htmlFor="money-input">{title}</label>
      <input
        id="money-input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChange={handleChange}
        {...props}
        className={error ? 'error' : undefined}
      />
    </form>
  )
}
