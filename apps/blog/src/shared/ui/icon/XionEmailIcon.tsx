"use client";
import EmailIcon from "@repo/icon/email-icon";

import { throttle } from "@xionwcfm/utils/function";
import { clipboard } from "@xionwcfm/utils/web";
import { cn } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { AUTHOR_EMAIL } from "~/shared/constants";
import type { IconProps } from "./icon.type";

const handleEmailClick = throttle(async () => {
  const isSuccess = await clipboard.writeText(AUTHOR_EMAIL);
  if (isSuccess) {
    toast.success("이메일이 클립보드에 복사되었어요!");
  } else {
    toast.error("이메일을 복사하는 데에 실패했어요");
  }
}, 1500);

export const XionEmailIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <button name="email-button" aria-label={"email-button"} className=" hover:opacity-70" type="button">
      <EmailIcon onClick={handleEmailClick} className={cn("w-24 h-24 text-neutral-500", className)} />
    </button>
  );
};
