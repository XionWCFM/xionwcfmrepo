import { Flex } from "@xionwcfm/xds/flex";
import { Stack } from "@xionwcfm/xds/stack";
import { EnvToTsSidebar } from "~/widgets/sidebar";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex>
      <EnvToTsSidebar />
      <Stack w={"100%"}>{children}</Stack>
    </Flex>
  );
}
