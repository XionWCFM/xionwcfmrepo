import { isBefore } from "date-fns/isBefore";
import { isSameDay } from "date-fns/isSameDay";

export const isBeforeWithSameday = (today: Date, startDate: Date) => {
  return isBefore(startDate, today) || isSameDay(today, startDate);
};
