import { Button, Paragraph } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, useCallback } from "react";

export const CopyResult = () => {
  const { copyClipboard } = useCopyCurrentLink();

  const handleCopyClick = () => {
    const isSuccess = copyClipboard();
    if (isSuccess) {
      toast.success("클립보드에 복사되었어요!");
    }
  };

  return (
    <Fragment>
      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"12"}>
        {"나의 결과를 친구들에게 쉽게 공유할 수 있어요\n버튼을 눌러 링크를 복사하고 친구에게 전달하세요!"}
      </Paragraph>

      <Button variant={"outline"} size={"md"} onClick={handleCopyClick}>
        내 결과지 복사하기
      </Button>
    </Fragment>
  );
};

const useCopyCurrentLink = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const copyClipboard = useCallback(() => {
    try {
      const url = `${window.location.origin}${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      navigator.clipboard.writeText(url);
      return true;
    } catch (e) {
      return false;
    }
  }, [pathname, searchParams]);
  return { copyClipboard };
};
