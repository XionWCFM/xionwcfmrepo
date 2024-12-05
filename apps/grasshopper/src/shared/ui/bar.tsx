import { CaretLeftIcon, Cross1Icon } from "@radix-ui/react-icons";
import { Pressable, cn } from "@xionwcfm/xds";
import type { ComponentPropsWithoutRef } from "react";
interface BarProps extends ComponentPropsWithoutRef<"header"> {
  left?: React.ReactNode;
  right?: React.ReactNode;
  middle?: React.ReactNode;
}

const Root = ({ left, right, middle, className, ...props }: BarProps) => {
  return (
    <header className={cn("flex min-h-24 max-h-24 justify-between items-center w-full", className)} {...props}>
      <div className=" w-16 h-16 cursor-pointer">{left}</div>
      <div className=" flex-grow flex justify-center items-center ">{middle}</div>
      <div className=" w-16 h-16 cursor-pointer">{right}</div>
    </header>
  );
};

const BackIcon = ({ className, onClick, ...props }: ComponentPropsWithoutRef<"button">) => {
  return (
    <Pressable>
      <button name="back-icon" onClick={onClick} className={cn(" rounded-sm", className)} {...props}>
        <CaretLeftIcon className=" text-neutral-500 w-24 h-24" />
      </button>
    </Pressable>
  );
};

const CloseIcon = ({ className, onClick, ...props }: ComponentPropsWithoutRef<"button">) => {
  return (
    <button name="close-icon" onClick={onClick} className={cn(" rounded-sm", className)} {...props}>
      <Cross1Icon className=" text-neutral-500  " />
    </button>
  );
};

const Title = ({ className, children, ...props }: ComponentPropsWithoutRef<"h1">) => {
  return (
    <h1 className={cn(" font-bold text-neutral-60 text-16", className)} {...props}>
      {children}
    </h1>
  );
};

export const Bar = {
  Root,
  BackIcon,
  CloseIcon,
  Title,
};
