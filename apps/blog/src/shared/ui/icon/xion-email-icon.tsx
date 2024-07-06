"use client";
import EmailIcon from "@xionwcfm/icon/email-icon";
import { cn } from "@xionwcfm/ui/cn";
import { toast } from "@xionwcfm/ui/toast";
import { throttle } from "@xionwcfm/utils/function";
import { clipboard } from "@xionwcfm/utils/web";
import { AUTHOR_EMAIL } from "~/shared/constants";
import type { IconProps } from "./icon.type";

const handleEmailClick = throttle(async () => {
  const isSuccess = await clipboard.writeText(AUTHOR_EMAIL);
  if (isSuccess) {
    toast.success({ content: "이메일이 클립보드에 복사되었어요!" });
  } else {
    toast.error({ content: "이메일을 복사하는 데에 실패했어요" });
  }
}, 1500);

export const XionEmailIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <button className=" hover:opacity-70" type="button">
      <EmailIcon onClick={handleEmailClick} className={cn("w-24 h-24 text-neutral-500", className)} />
    </button>
  );
};
