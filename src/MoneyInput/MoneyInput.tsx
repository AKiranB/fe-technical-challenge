import React, { useState, useEffect, useMemo } from 'react'

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
  const [isFocused, setIsFocused] = useState(false)

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
    })
  }, [locale])

  useEffect(() => {
    if (!isFocused) {
      const formattedValue = currencyFormatter.format(value / 100)
      setInputValue(formattedValue)
    }
  }, [value, currencyFormatter, isFocused])

  const handleFocus = () => {
    setInputValue((value / 100).toString())
    setIsFocused(true)
  }

  const handleBlur = () => {
    const formattedValue = currencyFormatter.format(value / 100)
    setInputValue(formattedValue)
    onValueChange(Number(inputValue) * 100)
    setIsFocused(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d.,-]/g, '')
    setInputValue(rawValue)
    const valueInCents = Math.round(Number(rawValue.replace(',', '.')) * 100)
    console.log(`Emitting value in cents: ${valueInCents}`)
    onValueChange(valueInCents)
  }

  //TODO:Styling
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
