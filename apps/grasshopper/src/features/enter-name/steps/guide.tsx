"use client";
import { Image } from "@xionwcfm/adapters/image";
import { useThrottle } from "@xionwcfm/react";
import { AspectRatio, Button, FixedBottom, FixedBottomCta, Paragraph, Spacing, Stack } from "@xionwcfm/xds";
import { toast } from "@xionwcfm/xds/toast";
import { delay } from "es-toolkit/promise";
import { Fragment, useState } from "react";
import { GrasshopperQuestionType } from "~/features/grasshopper-question/model/grasshopper-question.model";
import { RadioButton } from "~/shared/ui/radio-button";
import { StepTitle } from "../components/step-title";
export const EnterNameGuideStep = ({
  onProblemSolveNext,
  userName,
}: { userName: string; onTutorialNext: () => void; onProblemSolveNext: () => void }) => {
  const stepTitle = `반가워요 ${userName}님!\n먼저 간단한 문제를 풀어볼까요?`;
  const [selected, setSelected] = useState<string | null>(null);

  const disabled = selected === null;

  const handleClick = useThrottle(async () => {
    if (selected === sampleQuestion.grasshopper.id) {
      toast.success("잘하셨어요! 이제 진짜 문제를 풀어볼까요?", { duration: 1000 });
      await delay(1500);
      toast.dismiss();
      onProblemSolveNext();
    } else {
      toast.success("다시 한번 생각해볼까요?");
    }
  }, 1000);

  return (
    <Fragment>
      <StepTitle>{stepTitle}</StepTitle>

      <Spacing h={"16"} />
      <Paragraph color={"neutral-500"} size={"5"} weight={"light"}>
        Q. 이 메뚜기의 이름은 무엇일까요?
      </Paragraph>
      <AspectRatio ratio={16 / 9}>
        <Image className=" object-cover" src={sampleQuestion.grasshopper.imgSrc} alt="샘플 문제 이미지" fill />
      </AspectRatio>

      <Spacing h={"16"} />

      <Stack gap={"16"}>
        {sampleQuestion.choices.map((choice) => (
          <RadioButton selected={choice.id === selected} onClick={() => setSelected(choice.id)} key={choice.id}>
            {choice.name}
          </RadioButton>
        ))}
      </Stack>

      <FixedBottom>
        <FixedBottomCta disabled={disabled} onClick={handleClick}>
          제출하기
        </FixedBottomCta>
      </FixedBottom>
    </Fragment>
  );
};

const sampleQuestion = {
  type: "객관식",
  grasshopper: { id: "1", imgSrc: "/grasshoppers/우리벼메뚜기.png", name: "우리벼메뚜기" },
  choices: [
    { id: "2", name: "지네" },
    { id: "3", name: "방아깨비" },
    { id: "4", name: "소금쟁이" },
    { id: "1", name: "우리벼메뚜기" },
  ],
} satisfies GrasshopperQuestionType;
