import { Image } from "@xionwcfm/adapters/image";
import { AspectRatio, Paragraph, Spacing, Stack } from "@xionwcfm/xds";
import { Fragment } from "react";
import { Grasshoppers } from "~/entities/grasshoppers/api/grasshopper.data";
import { GrasshopperQuestionType } from "~/features/grasshopper-question/model/grasshopper-question.model";
import { RadioButton } from "./radio-button";

type QuestionAndAnswerFormProps = Pick<GrasshopperQuestionType, "choices" | "grasshopper" | "questionTitle"> & {
  selectedId: string | null;
  onClick: (id: string) => void;
};

export const QuestionAndAnswerForm = (props: QuestionAndAnswerFormProps) => {
  const { grasshopper, choices, questionTitle, selectedId, onClick } = props;
  return (
    <Fragment>
      <Paragraph color={"neutral-500"} size={"5"} weight={"medium"}>
        {questionTitle}
      </Paragraph>
      <Spacing h={"16"} />
      <AspectRatio ratio={16 / 9}>
        <Image className=" object-scale-down" src={grasshopper.imgSrc} alt="문제 이미지" fill />
      </AspectRatio>

      <Spacing h={"16"} />

      <Stack gap={"16"}>
        {choices.map((choice) => (
          <RadioButton selected={choice.id === selectedId} onClick={() => onClick(choice.id)} key={choice.id}>
            {choice.name}
          </RadioButton>
        ))}
      </Stack>
    </Fragment>
  );
};
