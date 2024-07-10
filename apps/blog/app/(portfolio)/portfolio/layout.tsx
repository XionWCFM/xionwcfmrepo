import { Stack } from "@xionwcfm/ui/stack";
import { InteractiveHeader } from "~/widgets/header/interactive-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Stack>
      <InteractiveHeader />
      {children}
    </Stack>
  );
}
