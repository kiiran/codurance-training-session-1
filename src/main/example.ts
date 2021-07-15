export class FizzBuzz {
    isMultipleOf(number: number, multiplier: number): boolean {
        return number % multiplier === 0
    }

    giveMeANumber(a: number): string {
        const [isMultipleOf3, isMultipleOf5] = [3, 5].map(n => this.isMultipleOf(a, n))

        if (isMultipleOf3 && isMultipleOf5) {
            return "fizzbuzz"
        }

        if (isMultipleOf3) {
            return "fizz"
        }

        if (isMultipleOf5) {
            return "buzz"
        }

        return a.toString()
    }
}
