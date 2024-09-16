import { Delay } from "@suspensive/react";
import { Image } from "@xionwcfm/adapters/image";
import { AspectRatio, Paragraph, Spacing, Stack } from "@xionwcfm/xds";
import { Fragment } from "react";
import { Grasshoppers } from "~/entities/grasshoppers/api/grasshopper.data";
import { GrasshopperQuestionType } from "~/features/grasshopper-question/model/grasshopper-question.model";
import { LoadingImage } from "./loading-image";
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
        <LoadingImage
          className=" object-scale-down"
          fallback={
            <Delay ms={500}>
              <GrasshopperFallbackImage />
            </Delay>
          }
          src={grasshopper.imgSrc}
          alt="문제 이미지"
          fill
        />
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

const GrasshopperFallbackImage = () => {
  return (
    <div className=" rounded-md w-full h-full  animate-pulse px-24 py-32 flex bg-gray-200 flex-col">
      <div className=" w-48 h-48 bg-gray-100 rounded-full"></div>

      <div className=" mt-16 w-[70%] h-[12px] bg-gray-100 rounded-full"></div>
      <div className=" mt-8 w-[100%] h-[12px] bg-gray-100 rounded-full"></div>
    </div>
  );
};
