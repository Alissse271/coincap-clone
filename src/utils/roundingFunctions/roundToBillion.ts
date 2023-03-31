export const roundToBillion = (value: string): string => {
  return (
    (Number(value) / 1000000000).toLocaleString("en-US", {
      maximumFractionDigits: 2,
    }) + "b"
  );
};
