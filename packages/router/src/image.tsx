import NextImage from "next/image";
import { type ComponentProps, type Ref, forwardRef } from "react";

type ImageProps = ComponentProps<typeof NextImage>;
export const Image = forwardRef(function Image(props: ImageProps, ref: Ref<HTMLImageElement>) {
  const { src, ...attributes } = props;
  return <NextImage {...attributes} ref={ref} title={attributes.alt} src={src} />;
});
