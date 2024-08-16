import { Flex, Stack } from "@xionwcfm/ui";
import { CustomerSignUpBar } from "src/feature/customer-sign-up/customer-sign-up-bar";

export function CustomerPage() {
  return (
    <Stack>
      <Flex px="16">
        <CustomerSignUpBar />
      </Flex>
    </Stack>
  );
}
