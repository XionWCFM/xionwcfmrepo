import { Stack } from "@xionwcfm/xds";
import Image from "next/image";
import { Todos } from "~/features/todos/todos";
export default function Home() {
  return (
    <Stack py={"24"} px={"16"}>
      <Todos />
    </Stack>
  );
}
