import { roundToMillion } from "../src/utils/roundingFunctions/roundToMillion";
import { roundToBillion } from "../src/utils/roundingFunctions/roundToBillion";
import { roundWithPrecision } from "../src/utils/roundingFunctions/roundWithPrecision";
import { convertDate } from "../src/utils/roundingFunctions/convertDate";
import { calcPercentageDifference } from "../src/utils/calcFunctions/calcPercentageDifference";

describe("roundToMillion function", () => {
  test('should convert to a string with suffix "m"', () => {
    expect(roundToMillion("123456789")).toBe("123.46m");
  });
  test("should convert floating point number", () => {
    expect(roundToMillion("1234567.89")).toBe("1.23m");
  });
  test("should convert number less than 1 million correctly", () => {
    expect(roundToMillion("999999")).toBe("1m");
  });
  test("handles empty string value correctly", () => {
    expect(roundToMillion("")).toBe("0m");
  });
});

describe("roundToBillion function", () => {
  test('should convert to a string with suffix "b"', () => {
    expect(roundToBillion("123456789876")).toBe("123.46b");
  });
  test("should convert floating point number", () => {
    expect(roundToBillion("1234567898.76")).toBe("1.23b");
  });
  test("should convert number less than 1 million correctly", () => {
    expect(roundToBillion("999999999")).toBe("1b");
  });
  test("handles empty string value correctly", () => {
    expect(roundToBillion("")).toBe("0b");
  });
});

describe("roundWithPrecision function", () => {
  test("should convert to a string to hundredths", () => {
    expect(roundWithPrecision("123.456789876", 2)).toBe("123.46");
  });
  test("should convert integer", () => {
    expect(roundWithPrecision("123", 2)).toBe("123.00");
  });
  test("should convert number less than 1 with systemic zeros", () => {
    expect(roundWithPrecision("0.000001234", 2)).toBe("0.0000012");
  });
  test("handles empty string value correctly", () => {
    expect(roundWithPrecision("", 2)).toBe("0");
  });
});

describe("convertDate function", () => {
  test("should convert to format DD/MM/YYYYY", () => {
    expect(convertDate(1530403200000)).toBe("01/07/2018");
  });
  test("handles a negative value correctly", () => {
    expect(convertDate(-1530403200000)).toBe("01/01/1970");
  });
  test("handles empty string value correctly", () => {
    expect(convertDate(0)).toBe("01/01/1970");
  });
  test("handles a NaN value correctly", () => {
    expect(convertDate(NaN)).toBe("Invalid Date");
  });
});

describe("calcPercentageDifference function", () => {
  test("should return the correct percentage difference", () => {
    expect(calcPercentageDifference("10", "18")).toBe("44.444");
    expect(calcPercentageDifference("150", "120")).toBe("25.000");
    expect(calcPercentageDifference("50", "50")).toBe("0.000");
  });
  test("should return the correct percentage difference if arguments are floating point numbers", () => {
    expect(calcPercentageDifference("24.28", "22.46")).toBe("8.103");
  });

  test("handles division by zero", () => {
    expect(calcPercentageDifference("150", "0")).toBe("0.00");
  });
});
