const numerals: Record<number, string> = {
    1000: 'M',
    900: 'CM',
    500: 'D',
    400: 'CD',
    100: 'C',
    90: 'XC',
    50: 'L',
    40: 'XL',
    10: 'X',
    9: 'IX',
    5: 'V',
    4: 'IV',
    1: 'I',
}

export const romanize = (n: number) => {
    let output = ''
    const sortedNumerals: number[] = Object.keys(numerals).sort((a, b) => +b - +a).map(value => +value)
    for (const value of sortedNumerals) {
        while (n - value >= 0) {
            n -= value;
            output += numerals[value];
        }
    }

    return output
}
