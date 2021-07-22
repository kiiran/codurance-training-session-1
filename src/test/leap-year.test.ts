import {isLeapYear} from "../main/leap-year";

const TEST_CASES = [
    { year: 4, result: true },
    { year: 1993, result: false },
    { year: 1900, result: false },
    { year: 2000, result: true },
]

describe('isLeapYear', () => {
    it.each(TEST_CASES)('returns $result when the year is $year', ({ year, result }) => {
        expect(isLeapYear(year)).toBe(result)
    })
})
