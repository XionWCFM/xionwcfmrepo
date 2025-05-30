import { Flex, cn } from "@xionwcfm/xds";

export const MaxWidthContainer = ({ children, className }: { children?: React.ReactNode; className?: string }) => {
  return (
    <Flex className="w-screen justify-center items-center">
      <Flex className={cn(" max-w-[768px] w-full flex-col", className)}>{children}</Flex>
    </Flex>
  );
};
