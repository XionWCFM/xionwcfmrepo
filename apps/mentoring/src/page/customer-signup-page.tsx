import { Stack } from "@xionwcfm/ui";
import { CustomerSignUpBar } from "src/feature/customer-sign-up/customer-sign-up-bar";
import { CustomerSignUpFunnel } from "src/feature/customer-sign-up/customer-sign-up-funnel";
import { CustomerSignUpContext } from "src/feature/customer-sign-up/customer-sign-up-state";

export function CustomerSignUpPage() {
  return (
    <Stack pt="16" px="16">
      <CustomerSignUpBar />
      <CustomerSignUpContext>
        <CustomerSignUpFunnel />
      </CustomerSignUpContext>
    </Stack>
  );
}
