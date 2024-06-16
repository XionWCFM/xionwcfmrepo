export const commaize = (input: number | string): string => {
  const inputStr = input.toString();
  const parts = inputStr.split(".");
  //@ts-expect-error
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
