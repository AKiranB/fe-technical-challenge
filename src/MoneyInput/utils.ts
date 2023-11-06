const convertToCents = (value: number): number => {
  const centsValue = Math.round(value * 100)
  return centsValue
}

const sanitizeValue = (value: string) => {
  value = value.replace(/[^\d,.]+/g, '')
  const parts = value.split(/[,.]/)
  if (parts.length > 2) {
    value = parts.slice(0, -1).join('') + '.' + parts.slice(-1)
  }
  const sanitizedValue = parseFloat(value.replace(/,/g, '.'))
  return !isNaN(sanitizedValue) ? sanitizedValue : 0
}

export { convertToCents, sanitizeValue }
