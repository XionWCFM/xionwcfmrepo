import { Spacing } from "@xionwcfm/ui/spacing";
import { Stack } from "@xionwcfm/ui/stack";
import { Footer } from "~/widgets/footer";
import { InteractiveHeader } from "~/widgets/header/interactive-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack className="md:bg-neutral-100 min-h-screen">
      <InteractiveHeader />
      <Spacing className=" bg-neutral-50" h={"48"} />
      <Stack className="  overflow-hidden" w={"screen"} align={"center"}>
        <Stack className="  md:max-w-768 xl:max-w-1024" w={"screen"}>
          {children}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}
