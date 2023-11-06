import React, { useState, useEffect, useMemo } from 'react'
import _styles from './MoneyInput.module.css'
import { convertToCents, sanitizeValue } from './utils'

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
  disabled,
  ...props
}: MoneyInputProps): JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  //--> I considered storing the users rawInput in a seperate state
  //--> To be shown to them when the input is focused
  //--> But I decided against it. As if it is a invalid format
  //--> It is confusing to show it to them again

  const currencyFormatter = useMemo(() => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR',
    })
  }, [locale])

  //--> I've decided to keep this is the single place where the input is formatted
  //--> This will run when the handleBlur is called anyway

  useEffect(() => {
    if (!isFocused) {
      const formattedValue = currencyFormatter.format(value / 100)
      setInputValue(formattedValue)
    }
  }, [value, currencyFormatter, isFocused])

  const handleFocus = () => {
    if (disabled) return
    setInputValue((value / 100).toString())
    setIsFocused(true)
  }

  const handleBlur = () => {
    if (disabled) return
    const sanitizedValue = sanitizeValue(inputValue)
    const valueInCents = convertToCents(sanitizedValue)
    console.log(`Value in cents: ${valueInCents}`)
    onValueChange(valueInCents)
    setIsFocused(false)
  }

  //--> One option could be to control the users input to adhere to a valid
  //--> currency format. But this would require clear communication with the user
  //--> Instead it is formatted onblur, losing some of their original formatting
  //--> This is unfortunate

  //--> This could be debounced depending on how the value is being used

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/[^\d.,-]/g, '')
    //Prevent processing the value if no valid character has been added to it
    if (rawValue !== inputValue) {
      setInputValue(rawValue)
      const sanitizedValue = sanitizeValue(rawValue)
      const valueInCents = convertToCents(sanitizedValue)
      console.log(`Value in cents: ${valueInCents}`)
      onValueChange(valueInCents)
    }
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
        aria-label={title}
        aria-readonly={disabled ? 'true' : 'false'}
        onChange={handleChange}
        readOnly={disabled}
        {...props}
        className={`${_styles.input} ${error ? _styles.error : ''}`}
      />
    </form>
  )
}
