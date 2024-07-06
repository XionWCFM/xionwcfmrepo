import NextImage from "next/image";
import { type ComponentPropsWithoutRef, type Ref, forwardRef } from "react";

type ImageProps = {
  src: any;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  quality?: number;
  placeholder?: "empty" | "blur";
  layout?: string;
  unoptimized?: boolean;
  blurDataURL?: string;
} & Omit<ComponentPropsWithoutRef<"img">, "src">;

export const Image = forwardRef(function Image(props: ImageProps, ref: Ref<HTMLImageElement>) {
  const {
    src,
    alt,
    width,
    blurDataURL,
    height,
    priority,
    fill,
    quality,
    placeholder,
    layout,
    unoptimized,
    fetchPriority,
    ...attributes
  } = props;

  return (
    <NextImage
      src={src}
      title={alt ?? ""}
      alt={alt ?? ""}
      width={width}
      height={height}
      priority={priority}
      layout={layout}
      fill={fill}
      quality={quality}
      placeholder={placeholder ?? "empty"}
      ref={ref}
      unoptimized={unoptimized}
      blurDataURL={blurDataURL}
      fetchPriority={fetchPriority}
      {...attributes}
    />
  );
});
