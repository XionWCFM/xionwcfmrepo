import { useInternalRouter } from "@xionwcfm/adapters/router";
import { Button, Paragraph } from "@xionwcfm/xds";
import { Fragment } from "react";
import { $Routes } from "~/shared/routes";

export const RetryButton = () => {
  const router = useInternalRouter();
  const handleHomeClick = () => {
    router.push($Routes.root.path());
  };

  return (
    <Fragment>
      <Paragraph color={"neutral-500"} weight={"light"} size={"4"} mb={"16"}>
        {"다시 한번 문제를 풀어보는 건 어때요?"}
      </Paragraph>
      <Button variant={"emphasis"} size={"lg"} onClick={handleHomeClick}>
        문제 풀러가기
      </Button>
    </Fragment>
  );
};
