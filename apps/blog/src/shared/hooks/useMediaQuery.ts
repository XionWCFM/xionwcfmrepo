import { useEffect, useState } from "react";

/**
 * useMediaQuery 훅
 * @param query - CSS 미디어 쿼리 문자열 (예: '(max-width: 768px)')
 * @returns boolean - 미디어 쿼리 상태
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    // 초기 상태 설정
    setMatches(mediaQuery.matches);

    // 이벤트 핸들러
    const handleChange = () => {
      setMatches(mediaQuery.matches);
    };

    // 리스너 추가
    mediaQuery.addEventListener("change", handleChange);

    // 클린업 - 리스너 제거
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
