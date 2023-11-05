import React, { useState, useEffect, useMemo } from 'react'
import _styles from './MoneyInput.module.css'

interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  locale?: 'de-DE' | 'en-US' | 'en-GB' | 'fr-FR'
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
      if (inputValue !== formattedValue) {
        setInputValue(formattedValue)
      }
    }
  }, [value, currencyFormatter, isFocused])

  const convertToCents = (value: number): number => {
    const centsValue = Math.round(value * 100)
    return centsValue
  }

  const sanitizeValue = (value: string) => {
    const sanitizedValue = Number(value.replace(',', '.'))
    return sanitizedValue
  }

  const handleFocus = () => {
    setInputValue((value / 100).toString())
    setIsFocused(true)
  }

  const handleBlur = () => {
    const sanitizedValue = sanitizeValue(inputValue)
    if (!isNaN(sanitizedValue)) {
      const valueInCents = convertToCents(sanitizedValue)
      onValueChange(valueInCents)
      console.log(`Value in cents: ${valueInCents}`)
      const formattedValue = currencyFormatter.format(sanitizedValue / 100)
      setInputValue(formattedValue)
    }
    setIsFocused(false)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d.,-]/g, '')
    setInputValue(rawValue)
    const sanitizedValue = sanitizeValue(rawValue)
    const valueInCents = convertToCents(sanitizedValue)
    console.log(`Value in cents: ${valueInCents}`)
    onValueChange(valueInCents)
  }

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
