export const roundWithPrecision = (value: string, precision: number): string => {
  if (Number(value) >= 1 || Number(value) <= -1) {
    return Number(value).toFixed(2);
  } else {
    const number = Number(value);
    const factor: number = Math.floor(1 / number);
    const length: number = Math.abs(factor).toString().length - 1;
    const power: number = Math.pow(10, length + precision);

    return String(Math.round(number * power) / power);
  }
};
