export const calculateAverage = (numbers) =>  {
    if (!Array.isArray(numbers) || numbers.length === 0) {
        return 0;
    }
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;

    return Math.round(average * 10) / 10;
}