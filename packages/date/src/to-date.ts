import { parseISO } from "date-fns";

/**
 * 주어진 문자열 또는 날짜 객체를 Date 객체로 변환합니다.
 * @param {string | Date} date - 변환할 문자열 또는 날짜 객체입니다.
 * @returns {Date} - 변환된 Date 객체입니다.
 * @throws {InvalidDateError} - 유효하지 않은 날짜 형식일 경우 발생하는 예외입니다.
 *
 * @example
 * const dateString = "2022-01-01";
 * const date = toDate(dateString);
 * console.log(date); // Sat Jan 01 2022 00:00:00 GMT+0000 (Coordinated Universal Time)
 *
 * const currentDate = new Date();
 * const convertedDate = toDate(currentDate);
 * console.log(convertedDate); // Current date object
 */
export const toDate = (date: string | Date): Date => {
  if (typeof date === "string") {
    return parseISO(date);
  }
  return date;
};
