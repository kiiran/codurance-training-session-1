export const getFibonacci = (position: number): number => {
    if (position >= 2) {
        return getFibonacci(position - 1) + getFibonacci(position - 2)
    }

    return position
}
