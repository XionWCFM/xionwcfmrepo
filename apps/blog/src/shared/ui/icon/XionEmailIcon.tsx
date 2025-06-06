"use client";

import { clipboard } from "@xionwcfm/utils/web";
import { toast } from "@xionwcfm/xds/toast";
import { throttle } from "es-toolkit";
import { AUTHOR_EMAIL } from "~/shared/constants/constants";

const handleEmailClick = throttle(async () => {
  const isSuccess = await clipboard.writeText(AUTHOR_EMAIL);
  if (isSuccess) {
    toast.success("이메일이 클립보드에 복사되었어요!");
  } else {
    toast.error("이메일을 복사하는 데에 실패했어요");
  }
}, 1500);

export const XionEmailIcon = (props: IconProps) => {
  return (
    <button
      onClick={handleEmailClick}
      name="email-button"
      aria-label={"email-button"}
      className=" hover:opacity-70"
      type="button"
    >
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        className="w-24 h-24 text-neutral-500"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58167 12.4183 0 8 0C3.58173 0 0 3.58167 0 8C0 12.4183 3.58173 16 8 16ZM4 7.70398C4 10.6639 5.95203 12.392 8.46399 12.392C9.56799 12.392 10.688 12.024 11.568 11.416L10.784 9.95996C10.128 10.36 9.48798 10.584 8.76801 10.584C7.44 10.584 6.47998 9.83203 6.27197 8.35999H11.808C11.856 8.13599 11.904 7.71997 11.904 7.27197C11.904 4.79199 10.64 3 8.15997 3C6.04797 3 4 4.79199 4 7.70398ZM9.90399 6.79199H6.23999C6.43201 5.47998 7.26398 4.80798 8.20801 4.80798C9.35999 4.80798 9.90399 5.57605 9.90399 6.79199Z"
          fill={"currentColor"}
        />
      </svg>
    </button>
  );
};

type IconProps = {
  onClick?: () => void;
  className?: string;
};
