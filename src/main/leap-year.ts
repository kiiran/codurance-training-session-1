const isMultipleOf = (a: number, b: number) => {
  return a % b === 0
}

export const isLeapYear = (year: number) =>
  isMultipleOf(year, 4) && (isMultipleOf(year, 400) || !isMultipleOf(year, 100))
