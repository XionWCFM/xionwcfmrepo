"use client";
import { HomeIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { $Routes } from "~/shared/routes";
import { Sidebar } from "~/shared/sidebar";

const sidebarItems = [
  { content: "Get Started", icon: <HomeIcon />, id: "getStarted", route: $Routes.root() },
  { content: "NodeJS", icon: <HomeIcon />, id: "envtotsnode", route: $Routes.envToTsNode() },
  { content: "Vite", icon: <HomeIcon />, id: "envtotsvite", route: $Routes.envToTsVite() },
];

export const EnvToTsSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar.Layout value={pathname}>
      {sidebarItems.map((sidebar) => (
        <Sidebar.Item key={sidebar.id} value={sidebar.route} onClick={() => router.push(sidebar.route)}>
          {sidebar.content}
        </Sidebar.Item>
      ))}
    </Sidebar.Layout>
  );
};
