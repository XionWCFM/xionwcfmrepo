import { addHours } from "date-fns";

export const getKoreanToday = (date: Date) => {
  return addHours(date, 9);
};
