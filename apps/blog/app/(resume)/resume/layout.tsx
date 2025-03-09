import { Spacing, Stack } from "@xionwcfm/xds";
import { InteractiveHeader } from "~/widgets/header/interactive-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack minH={"screen"}>
      <InteractiveHeader />
      <Spacing className="bg-neutral-50" h={"48"} w={undefined} />
      <Stack className="overflow-hidden" w={"screen"} items={"center"}>
        <Stack w={"screen"} maxW={{ md: "768" }}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
}
