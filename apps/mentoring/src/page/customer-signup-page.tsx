import { Stack } from "@xionwcfm/xds";
import { CustomerSignUpBar } from "src/feature/customer-sign-up/bar";
import { CustomerSignUpFunnel } from "src/feature/customer-sign-up/funnel";

export function CustomerSignUpPage() {
  return (
    <Stack pt="16" px="16">
      <CustomerSignUpBar />
      <CustomerSignUpFunnel />
    </Stack>
  );
}
