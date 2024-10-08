"use client";
import { Button, Stack } from "@xionwcfm/xds";
import Link from "next/link";
import { useCustomerSignUpStorage } from "src/feature/customer-sign-up/state";
import { ROUTES } from "~/shared/routes";
import { usePolling } from "~/shared/use-polling";

export function RootPage() {
  const [customerSignUpState] = useCustomerSignUpStorage();
  const shouldSignUp = Boolean(!customerSignUpState.id);
  const [startPolling] = usePolling(
    async (hi: string) => {
      console.log("hi", hi);
      return true;
    },
    { shouldRetry: () => true },
  );
  return (
    <Stack className=" h-screen justify-end">
      <Stack gap={"16"} px="12" py="16">
        <button
          onClick={async () => {
            const result = await startPolling("hia");
            console.log("done");
          }}
        >
          클릭
        </button>
        <Button
          as={Link}
          href={shouldSignUp ? ROUTES.CUSTOMER_SIGN_UP() : ROUTES.CUSTOMER()}
          variant={"emphasis"}
          size={"full"}
        >
          주문하러가기
        </Button>
        <Button as={Link} href={ROUTES.BARISTA()} variant={"secondary"} size={"full"}>
          주문받으러가기
        </Button>
      </Stack>
    </Stack>
  );
}
