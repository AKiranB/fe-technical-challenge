import _styles from './MoneyInput.module.css'

interface MoneyInput extends React.InputHTMLAttributes<HTMLInputElement> {
  locale: string
  error: boolean
}

export default function MoneyInput({ locale, error = false, ...props }: MoneyInput): JSX.Element {
  return <input {...props} />
}
