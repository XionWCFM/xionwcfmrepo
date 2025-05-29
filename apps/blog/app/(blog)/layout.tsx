import { Flex, Spacing } from "@xionwcfm/xds";
import { InteractiveHeader } from "~/widgets/header/interactive-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex className=" flex-col min-h-screen">
      <InteractiveHeader />
      <Spacing className="bg-neutral-50 h-[48px]" />
      <Flex className=" flex-col overflow-hidden w-screen items-center">
        <Flex className=" flex-col w-screen max-w-[768px]">{children}</Flex>
      </Flex>
    </Flex>
  );
}
