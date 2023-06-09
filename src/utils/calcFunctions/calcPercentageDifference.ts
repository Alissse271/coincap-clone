export const calcPercentageDifference = (firstNumber: string, secondNumber: string): string => {
  if (secondNumber !== "0.00" && secondNumber !== "0") {
    return String(Math.abs((+firstNumber / +secondNumber) * 100 - 100).toFixed(3));
  } else {
    return "0.00";
  }
};
