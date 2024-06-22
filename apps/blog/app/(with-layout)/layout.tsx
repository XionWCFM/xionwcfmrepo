import { Stack } from "@xionwcfm/ui/stack";
import { Header } from "~/widgets/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <Stack className=" md:bg-neutral-100 overflow-hidden" w={"screen"} align={"center"}>
        <Stack className=" md:bg-neutral-100 md:max-w-768 xl:max-w-1024" w={"screen"}>
          {children}
        </Stack>
      </Stack>
    </>
  );
}
