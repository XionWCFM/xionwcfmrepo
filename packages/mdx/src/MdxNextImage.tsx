import Image from "next/image";
import type { HTMLProps } from "react";

export function MdxNextImage(props: HTMLProps<HTMLImageElement>) {
  const { src } = props;
  const width = Number(props.width);
  const height = Number(props.height);

  if (src) {
    if (src.startsWith("http")) {
      // eslint-disable-next-line @next/next/no-img-element
      return (
        <img src={src} alt={src} width={width} height={height} title={props.alt || ""} aria-label={props.alt || ""} />
      );
    }
    return (
      <Image
        width={width}
        height={height}
        alt={props.alt || ""}
        title={props.alt || ""}
        aria-label={props.alt || ""}
        crossOrigin="anonymous"
        src={src}
        placeholder="empty"
        className={` object-cover ${props.className}`}
      />
    );
  }
  return <p>Currently, image is not available. {src}</p>;
}
