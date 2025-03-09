/**
 * 주어진 날짜를 ISO 형식의 문자열로 변환합니다.
 *
 * @param {string | Date} date - 변환할 날짜입니다.
 * @returns {string} - ISO 형식의 문자열로 변환된 날짜입니다.
 * @throws {InvalidDateError} - 날짜가 유효하지 않을 경우 발생하는 에러입니다.
 *
 * @example
 * const date = new Date();
 * const isoDate = toIso(date);
 * console.log(isoDate); // "2022-01-01T00:00:00.000Z"
 *
 * const dateString = "2022-01-01";
 * const isoDateString = toIso(dateString);
 * console.log(isoDateString); // "2022-01-01"
 */
export const toIso = (date: string | Date): string => {
  if (typeof date === "string") {
    return date;
  }
  return date.toISOString();
};
