"use client";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@xionwcfm/ui";
import { useRouter } from "next/navigation";
import { ROUTES } from "~/shared/routes";

export const CustomerOrderBar = () => {
  const router = useRouter();
  const handleBackClick = () => {
    router.replace(ROUTES.ROOT());
  };
  return (
    <Flex justify={"between"} pt="16" mb="32">
      <Button onClick={handleBackClick}>
        <ChevronLeftIcon />
      </Button>
    </Flex>
  );
};
