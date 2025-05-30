"use client";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { Link } from "@repo/router";
import { Flex, cn } from "@xionwcfm/xds";
import { usePathname } from "next/navigation";

const NAVIGATE_LINKS = [
  {
    href: "/",
    label: "홈 페이지로 이동",
    children: "Home",
  },
  {
    href: "/posts",
    label: "posts 페이지로 이동",
    children: "Posts",
  },
  {
    href: "/about",
    label: "about 페이지로 이동",
    children: "About",
  },
];

export const NavigateSection = (props: { className?: string }) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;
  const filteredLinks = NAVIGATE_LINKS.filter((link) => !isActive(link.href));

  return (
    <Flex className={cn(" gap-x-[16px]", props.className)}>
      {filteredLinks.map((link) => (
        <NavigateLink key={link.href} {...link} />
      ))}
    </Flex>
  );
};

export const NavigateLink = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) => {
  return (
    <Link
      href={href}
      aria-label={label}
      className=" group hover:scale-[1.05] flex items-center gap-x-[4px] transition-all duration-300 hover:bg-primary-alpha-300 px-[16px] py-[8px] rounded-sm bg-gray-50 text-[16px] text-gray-700"
    >
      <span className=" duration-300 transition-all group-hover:text-primary-700 ">{children}</span>
      <ExternalLinkIcon className=" text-gray-600 w-[16px] h-[16px] group-hover:text-primary-600 duration-300 transition-all" />
    </Link>
  );
};
