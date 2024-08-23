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
    <Stack className=" min-h-screen">
      <InteractiveHeader />
      <Spacing className=" bg-neutral-50" h={"48"} />
      <Stack className="  overflow-hidden" w={"screen"} items={"center"}>
        <Stack className="  md:max-w-768 " w={"screen"}>
          {children}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}
