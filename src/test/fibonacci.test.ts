import {getFibonacci} from "../main/fibonacci";


describe('fibonacci', () => {
    it('returns 0 if the position is 0', () => {
        expect(getFibonacci(0)).toBe(0)
    })

    it('returns 1 if the position is 1', () => {
        expect(getFibonacci(1)).toBe(1)
    })

    it('returns 1 if the position is 2', () => {
        expect(getFibonacci(2)).toBe(1)
    })

    it('returns 2 if the position is 3', () => {
        expect(getFibonacci(3)).toBe(2)
    })

    it('returns 34 if the position is 9', () => {
        expect(getFibonacci(9)).toBe(34)
    })

    it('returns 75025 if the position is 25', () => {
        expect(getFibonacci(25)).toBe(75025)
    })
})
