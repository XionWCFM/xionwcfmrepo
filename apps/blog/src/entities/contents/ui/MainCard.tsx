import { Link } from "@repo/router";
import { Flex } from "@xionwcfm/xds";
import Image from "next/image";
import { AUTHOR_NAME } from "~/shared/constants/constants";
import { XION_MAC_CODING_CHAR_WEBP } from "~/shared/constants/images/images";
import type { createPostCardViewModel } from "./createPostCardViewModel";

export const MainCard = (props: ReturnType<typeof createPostCardViewModel>) => {
  return (
    <Link
      aria-label={props.title}
      href={props.href}
      className=" flex flex-col rounded-sm bg-primary-600 p-[16px] transition-all duration-300 hover:opacity-90"
    >
      <span className=" text-[26px] line-clamp-2 font-medium text-gray-100 ">{props.title}</span>
      <span className=" text-gray-100 opacity-70 line-clamp-3 text-[16px] mb-[16px]">{props.description}</span>

      <Flex className="  justify-between items-end">
        <Flex className=" flex-col">
          <span className=" text-gray-100 text-[12px]">{AUTHOR_NAME}</span>
          <span className=" text-gray-100 text-[12px]">{props.date}</span>
        </Flex>
        <Image src={XION_MAC_CODING_CHAR_WEBP.src} width={160} height={160} alt="xionwcfm" />
      </Flex>
    </Link>
  );
};
