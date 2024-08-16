import { FunnelGuard } from "@xionhub/funnel-core";
import { Button, ConfirmDialog } from "@xionwcfm/ui";
import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import { PropsWithChildren } from "react";
import { ROUTES } from "~/shared/routes";
import { useCustomerSignUpState } from "../state";

export const CustomerSignUpGuard = ({ children }: PropsWithChildren) => {
  const customerSignUpState = useCustomerSignUpState();
  const router = useRouter();

  const condition = Boolean(!customerSignUpState.id);
  const handleRestrict = async () => {
    await overlay.openAsync(
      ({ isOpen, close }) => (
        <ConfirmDialog
          isOpen={isOpen}
          onClose={() => close(true)}
          title="이미 가입된 계정이 있어요"
          description="음료를 주문 하러 가볼까요?"
          primaryButton={
            <Button variant={"primary"} size={"lg"} className=" w-full" onClick={() => close(true)}>
              주문하러가기
            </Button>
          }
        />
      ),
      { overlayId: "custom-id" },
    );
    router.replace(ROUTES.CUSTOMER());
  };
  return (
    <FunnelGuard condition={condition} onRestrict={handleRestrict}>
      {children}
    </FunnelGuard>
  );
};
