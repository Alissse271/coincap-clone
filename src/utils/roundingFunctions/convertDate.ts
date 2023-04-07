export const convertDate = (value: number): string => {
  if (value < 0) {
    return "01/01/1970";
  }
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
