"use client";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@xionwcfm/xds";
import { useRouter } from "next/navigation";

export const CustomerSignUpBar = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.back();
  };
  return (
    <Flex justify={"between"} pt="16" mb="32">
      <Button onClick={handleBackClick}>
        <ChevronLeftIcon />
      </Button>
    </Flex>
  );
};
