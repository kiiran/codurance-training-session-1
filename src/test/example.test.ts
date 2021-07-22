import { FizzBuzz } from '../main/example'

describe('Fizzbuzz', () => {
  it('returns the number in string', () => {
    let fizzBuzz: FizzBuzz = new FizzBuzz()
    expect(fizzBuzz.giveMeANumber(1)).toBe('1')
  })

  it('returns fizz if is multiple by 3', () => {
    let fizzBuzz: FizzBuzz = new FizzBuzz()
    expect(fizzBuzz.giveMeANumber(3)).toBe('fizz')
  })

  it('returns buzz if is multiple by 5', () => {
    let fizzBuzz: FizzBuzz = new FizzBuzz()
    expect(fizzBuzz.giveMeANumber(5)).toBe('buzz')
  })
  it('returns fizzbuzz if is multiple by 5 and 3', () => {
    let fizzBuzz: FizzBuzz = new FizzBuzz()
    expect(fizzBuzz.giveMeANumber(15)).toBe('fizzbuzz')
  })
})
