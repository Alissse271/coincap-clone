export const roundToMillion = (value: string): string => {
  return (
    (Number(value) / 1000000).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }) + "m"
  );
};
