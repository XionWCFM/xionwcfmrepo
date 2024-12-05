import { Delay } from "@suspensive/react";
import { AspectRatio, Paragraph, Stack } from "@xionwcfm/xds";
import type { PropsWithChildren, ReactNode } from "react";
import type { GrasshopperQuestion } from "~/entities/grasshoppers/model/grasshopper.model";
import { LoadingImage } from "./loading-image";
import { RadioButton } from "./radio-button";

type QuestionAndAnswerFormProps = Pick<GrasshopperQuestion, "choices" | "grasshopper" | "questionTitle"> & {
  selectedId: string | null;
  onClick: (id: string) => void;
};

export const QuestionAndAnswerForm = (props: QuestionAndAnswerFormProps) => {
  const { grasshopper, choices, questionTitle, selectedId, onClick } = props;
  return (
    <Stack gap={"16"}>
      <Paragraph color={"neutral-500"} size={"5"} weight={"medium"}>
        {questionTitle}
      </Paragraph>

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
          fill={true}
        />
      </AspectRatio>

      <Stack gap={"16"}>
        {choices.map((choice) => (
          <RadioButton selected={choice.id === selectedId} onClick={() => onClick(choice.id)} key={choice.id}>
            {choice.name}
          </RadioButton>
        ))}
      </Stack>
    </Stack>
  );
};

const Title = ({ children }: PropsWithChildren) => {
  return (
    <Paragraph color={"neutral-500"} size={"5"} weight={"medium"}>
      {children}
    </Paragraph>
  );
};

const Image = ({ src, fallback, alt }: { src: string; fallback?: ReactNode; alt?: string }) => {
  return (
    <AspectRatio ratio={16 / 9}>
      <LoadingImage
        className=" object-scale-down"
        fallback={
          fallback ?? (
            <Delay ms={500}>
              <GrasshopperFallbackImage />
            </Delay>
          )
        }
        src={src}
        alt={alt ?? "문제 이미지"}
        fill={true}
      />
    </AspectRatio>
  );
};

const Layout = ({ children }: PropsWithChildren) => {
  return <Stack gap={"16"}>{children}</Stack>;
};

const ChoiceLayout = ({ children }: PropsWithChildren) => {
  return <Stack gap={"16"}>{children}</Stack>;
};

export const QuestionForm = {
  Layout,
  ChoiceLayout,
  Title,
  Image,
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
