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

// context api 를 쓴다 -> 상태관리 -> 전부리렌더링 -> 메모를해줘야돼 -> 메모하느라 또 메모리낭비하고
// jotai , redux , zustand -> selector -> 외부 라이브러리에 의존성이 생기겠죠 -> 외부라이브러리에 의존성이 생기면 -> 나중에 다른라이브러리 갈아탈때 힘들어지고
// 훅에 의존안하면서 / 라이브러리에도 의존안하기 -> toast.success()

export const XionEmailIcon = (props: IconProps) => {
  const { className } = props;

  return (
    <button name="email-button" aria-label={"email-button"} className=" hover:opacity-70" type="button">
      <EmailIcon onClick={handleEmailClick} className={cn("w-24 h-24 text-neutral-500", className)} />
    </button>
  );
};
