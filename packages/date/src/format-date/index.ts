import { format } from "date-fns";

type DateConverterVariant = "yyyy.MM.dd" | "yyyy.MM.dd - HH:mm" | "yyyy.MM.dd. HH:mm" | "M월 dd일" | "MM월 dd일";

/**
 * 날짜를 다른 형식으로 변환하는 함수입니다.
 *
 * @param date 변환할 날짜입니다.
 * @param dateFormat 변환할 날짜 형식입니다. 기본값은 "yyyy.MM.dd"입니다.
 * @returns 변환된 날짜 문자열입니다.
 * @throws {InvalidDateError} 날짜 변환 중에 오류가 발생한 경우 예외를 throw합니다.
 *
 * @example
 * // 사용 예시:
 * const formatDate = formatDate("2022-01-01", "MM/dd/yyyy");
 * console.log(formatDate); // 출력: "01/01/2022"
 */
export const formatDate = (date: string | Date, dateFormat: DateConverterVariant) => {
  if (typeof date === "string") {
    return format(new Date(date), dateFormat);
  }
  return format(date, dateFormat);
};
