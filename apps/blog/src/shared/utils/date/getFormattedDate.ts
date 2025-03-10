import { format, parseISO } from "date-fns";

export const getFormattedDate = (date: string | Date, formatText: string, fallback?: string) => {
  try {
    const internalDate = typeof date === "string" ? parseISO(date) : date;
    return format(internalDate, formatText);
  } catch (_e) {
    return fallback ?? "";
  }
};
