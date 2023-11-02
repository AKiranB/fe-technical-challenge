interface MoneyInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  locale?: string
  error?: boolean
  onValueChange: (value: string) => void
  value: string
}

export default function MoneyInput({
  locale,
  error = false,
  value,
  onValueChange,
  ...props
}: MoneyInputProps): JSX.Element {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: handle locale, handle formatting
    const { value } = event.target
    onValueChange(value)
  }

  return <input value={value} onChange={handleChange} {...props} />
}
