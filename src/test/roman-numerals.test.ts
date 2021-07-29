import { romanize } from '../main/roman-numerals'

const TEST_CASES = [
  { input: 1, result: 'I' },
  { input: 2, result: 'II' },
  { input: 3, result: 'III' },
  { input: 5, result: 'V' },
  { input: 4, result: 'IV' },
  { input: 6, result: 'VI' },
  { input: 7, result: 'VII' },
  { input: 8, result: 'VIII' },
  { input: 9, result: 'IX' },
  { input: 10, result: 'X' },
  { input: 19, result: 'XIX' },
  { input: 10, result: 'X' },
  { input: 50, result: 'L' },
  { input: 40, result: 'XL' },
  { input: 90, result: 'XC' },
  { input: 400, result: 'CD' },
  { input: 500, result: 'D' },
]

describe('romanNumerals', () => {
  it.each(TEST_CASES)(
    'returns $result when the number is $input',
    ({ input, result }) => {
      expect(romanize(input)).toBe(result)
    },
  )
})
