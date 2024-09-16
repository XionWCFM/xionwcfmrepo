"use client";
import { useMutation } from "@tanstack/react-query";
import { Button, ConfirmDialog, Stack } from "@xionwcfm/xds";
import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import { CustomerOrderBar } from "src/feature/customer-order/bar";
import { useCustomerSignUpStorage } from "src/feature/customer-sign-up/state";
import { fetchCreateOrder, fetchOrderIsReady, fetchUpdateOrder } from "~/entities/order/api/order.api";
import { usePolling } from "~/shared/use-polling";
export function CustomerPage() {
  return (
    <Stack>
      <CustomerOrderBar />
      <OrderComponent />
    </Stack>
  );
}

const OrderComponent = () => {
  const { mutateAsync: startOrder } = useMutation({ mutationFn: fetchCreateOrder });
  const { mutateAsync: updateOrder } = useMutation({ mutationFn: fetchUpdateOrder });
  const [{ id }] = useCustomerSignUpStorage();
  const router = useRouter();
  const [orderIsReady] = usePolling(
    async (orderId: string) => {
      const result = await fetchOrderIsReady(orderId);
      return result;
    },
    { interval: 5000, shouldRetry: (value) => !value },
  );
  return (
    <Button
      onClick={async () => {
        const { success } = await overlay.openAsync<{ success: boolean }>(({ isOpen, close }) => (
          <ConfirmDialog
            title="음료 주문하기"
            description="아메리카노를 주문하시겠습니까?"
            isOpen={isOpen}
            onClose={() => close({ success: false })}
            primaryButton={
              <Button
                variant={"primary"}
                size={"lg"}
                className=" w-full"
                onClick={() => {
                  close({ success: true });
                }}
              >
                아메리카노 시키기
              </Button>
            }
          />
        ));
        if (!success) {
          return;
        }
        const orderId = await startOrder({ customerId: id! });
        await updateOrder({
          id: orderId.id,
          status: "orderReception",
          beverages: [{ beverageId: "1", quantity: 1 }],
        });
        console.log("orderId", orderId);
        await orderIsReady(orderId.id);
        overlay.open(({ isOpen, close }) => (
          <ConfirmDialog isOpen={isOpen} onClose={close} title="주문한 음료가 나왔습니다." />
        ));
      }}
    >
      음료를 주문해요
    </Button>
  );
};
