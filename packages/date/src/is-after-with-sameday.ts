import { isAfter } from "date-fns/isAfter";
import { isSameDay } from "date-fns/isSameDay";

export const isAfterWithSameday = (today: Date, endDate: Date) => {
  return isAfter(today, endDate) || isSameDay(today, endDate);
};
