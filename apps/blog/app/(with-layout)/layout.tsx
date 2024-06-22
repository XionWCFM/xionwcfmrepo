import { Stack } from "@xionwcfm/ui/stack";
import { Footer } from "~/widgets/footer";
import { Header } from "~/widgets/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack className="md:bg-neutral-100">
      <Header />
      <Stack className="  overflow-hidden" w={"screen"} align={"center"}>
        <Stack className="  md:max-w-768 xl:max-w-1024" w={"screen"}>
          {children}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
}
