import { toDate } from "date-fns/toDate";
/**
 * 입력된 문자열을 날짜로 변환하여 ISO 형식으로 반환합니다.
 * 변환에 실패한 경우 null을 반환합니다.
 *
 * @param input 변환할 문자열
 * @returns ISO 형식의 날짜 문자열 또는 null
 *
 * @example
 * const isoDate = safeGetIso("2022-01-01");
 * // isoDate: "2022-01-01"
 *
 * const invalidDate = safeGetIso("2022-13-01");
 * // invalidDate: null
 */
export const safeGetIso = (input: string) => {
  try {
    toDate(input);
    return input;
  } catch (_e) {
    return null;
  }
};
