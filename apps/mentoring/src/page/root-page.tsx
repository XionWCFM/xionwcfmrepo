import { Button, Stack } from "@xionwcfm/ui";
import Link from "next/link";
export function RootPage() {
  return (
    <Stack className=" h-screen justify-end">
      <Stack gap={"16"} px="12" py="16">
        <Button as={Link} href={"/customer"} variant={"emphasis"} size={"full"}>
          주문하러가기
        </Button>
        <Button as={Link} href={"/customer"} variant={"secondary"} size={"full"}>
          주문받으러가기
        </Button>
      </Stack>
    </Stack>
  );
}
