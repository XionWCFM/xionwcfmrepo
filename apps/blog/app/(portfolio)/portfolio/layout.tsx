import { Stack } from "@xionwcfm/xds";
import { StaticHeader } from "~/widgets/header/static-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack>
      <StaticHeader />
      {children}
    </Stack>
  );
}
