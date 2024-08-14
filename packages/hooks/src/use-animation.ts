import React, { useRef } from "react";
import useIntersectionObserver from "./use-intersection-observer";

interface OptionObject {
  delay?: number;
  isAnimatedOnlyOnce?: boolean;
}
/**
 * useAnimation 훅은 요소가 화면에 나타날 때 애니메이션 효과를 적용하는 React 훅입니다.
 *
 * @param classNameArray - 애니메이션 효과를 적용할 클래스 이름 배열입니다.
 * @param option - 옵션 객체입니다.
 * @param option.delay - 애니메이션 시작까지의 지연 시간 (밀리초)입니다. 기본값은 0입니다.
 * @param option.isAnimatedOnlyOnce - 애니메이션을 한 번만 실행할지 여부를 나타내는 불리언 값입니다. 기본값은 true입니다.
 *
 * @returns - ref 객체를 반환합니다. ref 객체는 애니메이션 효과를 적용할 대상 요소의 ref입니다.
 *
 * @example
 * ```tsx
 * import React from "react";
 * import useAnimation from "./useAnimation";
 *
 * const MyComponent = () => {
 *   const { ref } = useAnimation(["fade-in", "slide-up"], { delay: 500, isAnimatedOnlyOnce: false });
 *
 *   return <div ref={ref}>애니메이션 효과를 적용할 요소</div>;
 * };
 * ```
 */
const useAnimation = (classNameArray: string[], option?: OptionObject) => {
  const targetRef = React.useRef<HTMLDivElement | HTMLParagraphElement | HTMLHeadingElement>(null);
  const isAnimatedOnlyOnce = typeof option?.isAnimatedOnlyOnce === "boolean" ? option.isAnimatedOnlyOnce : true;
  const milliseconds = option?.delay ?? 0;
  const isOnce = useRef(true);
  const onIntersectHandler = async () => {
    if (!isOnce.current) {
      return;
    }

    await delay(milliseconds);
    if (isAnimatedOnlyOnce) {
      isOnce.current = false;
    }
    classNameArray.forEach((className) => {
      targetRef.current?.classList.add(className);
    });

    targetRef.current?.classList.remove("invisible");
  };
  const offIntersectHandler = () => {
    if (!isOnce.current) {
      return;
    }

    classNameArray.forEach((className) => {
      targetRef.current?.classList.remove(className);
    });

    targetRef.current?.classList.add("invisible");
  };
  useIntersectionObserver({
    target: targetRef,
    onIntersect: onIntersectHandler,
    offIntersect: offIntersectHandler,
    threshold: 0.15,
  });

  return { ref: targetRef };
};

const delay = (milliseconds: number) => {
  return new Promise((res) => setTimeout(res, milliseconds));
};

export default useAnimation;
