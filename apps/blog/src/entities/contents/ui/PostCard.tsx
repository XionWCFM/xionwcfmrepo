import { Link } from "@repo/router";
import { Box, Flex } from "@xionwcfm/xds";
import Image from "next/image";
import { XION_CIRCLE_LOGO_16_X_16_WEBP } from "~/shared/constants/images/images";
import type { createPostCardViewModel } from "./createPostCardViewModel";

export const PostCard = (props: ReturnType<typeof createPostCardViewModel>) => {
  return (
    <Link
      aria-label={`${props.title} 포스트 보러가기`}
      href={props.href}
      className=" bg-gray-50 ring-[0.5px] rounded-sm ring-gray-200 p-[16px] active:ring-primary-600 active:bg-primary-50 active:scale-[0.995] flex-col hover:ring-primary-600 hover:bg-primary-50 transition-all duration-300 w-full flex text-start"
    >
      <h2 className=" text-gray-700 font-regular text-[18px] mb-[4px] line-clamp-1 ">{props.title}</h2>
      <span className=" text-gray-600 font-light text-[14px] line-clamp-2 h-[42px] max-h-[42px]">
        {props.description}
      </span>
      <Flex className=" justify-end w-full mb-[4px]">
        <Flex className=" flex-col">
          <Flex className=" gap-x-[4px]">
            <Box>
              <Image src={XION_CIRCLE_LOGO_16_X_16_WEBP.src} width={16} height={16} alt="xionwcfm" />
            </Box>
            <span className=" text-gray-600 font-light text-[12px]">XionWCFM</span>
          </Flex>
        </Flex>
      </Flex>
      <Flex className=" justify-end w-full">
        <span className=" text-[12px] text-gray-400 font-light">{props.date}</span>
      </Flex>
    </Link>
  );
};
