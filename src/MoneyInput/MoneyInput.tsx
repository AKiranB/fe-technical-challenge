import React, { useState, useEffect, useMemo } from 'react'
import _styles from './MoneyInput.module.css'

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  locale?: 'de-DE' | 'en-US'
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

  //TODO:Fix edge cases
  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
    })
  }, [locale])

  useEffect(() => {
    if (!isFocused) {
      const formattedValue = currencyFormatter.format(value / 100)
      if (inputValue !== formattedValue) {
        setInputValue(formattedValue)
      }
    }
  }, [value, currencyFormatter, isFocused])

  const handleFocus = () => {
    setInputValue((value / 100).toString())
    setIsFocused(true)
  }

  //TODO: try to limit rerenders/improve performance
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
    // console.log(`Emitting value in cents: ${valueInCents}`)
    onValueChange(valueInCents)
  }

  //TODO:Styling
  return (
    <form className={_styles.form}>
      <label className={_styles.label} htmlFor="money-input">
        {title}
      </label>
      <input
        id="money-input"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChange={handleChange}
        {...props}
        className={`${_styles.input} ${error ? _styles.error : ''}`}
      />
    </form>
  )
}
