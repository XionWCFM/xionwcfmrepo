import NextImage from "next/image";
import { type ComponentProps, type Ref, forwardRef } from "react";

type ImageProps = ComponentProps<typeof NextImage> & { mode?: "noprefix" | "cloudfront" };
export const Image = forwardRef(function Image(props: ImageProps, ref: Ref<HTMLImageElement>) {
  const { src, mode = "noprefix", ...attributes } = props;
  const imageSrc = props.mode === "cloudfront" ? `https://d2f4hj0sh329cz.cloudfront.net${src}` : props.src;
  return <NextImage {...attributes} ref={ref} title={attributes.alt} src={imageSrc} />;
});
