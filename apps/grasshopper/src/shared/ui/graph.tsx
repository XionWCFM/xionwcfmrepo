import { InView } from "@xionwcfm/react";
import { XION_STYLE } from "@xionwcfm/token";
import { useState } from "react";

export const Graph = (props: {
  color?: string;
  percentage: number;
  width?: string;
  height?: string;
  delay?: number;
}) => {
  const { percentage, color, height, width, delay = 200 } = props;
  const [isAnimation, setIsAnimation] = useState(false);
  return (
    <InView
      once={true}
      onIntersectStart={() => {
        setTimeout(() => {
          setIsAnimation(true);
        }, delay);
      }}
    >
      <div
        className=" bg-gray-200 flex  rounded-sm items-end"
        style={{ height: height ?? "200px", width: width ?? "40px" }}
      >
        <div
          className=" rounded-sm w-full transition-all  "
          style={{
            height: isAnimation ? `${percentage}%` : "0%",
            backgroundColor: color ?? XION_STYLE.colors.primary[500],
            transitionDuration: `1600ms`,
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)", // 부드러운 애니메이션을 위한 easing 함수
          }}
        ></div>
      </div>
    </InView>
  );
};
