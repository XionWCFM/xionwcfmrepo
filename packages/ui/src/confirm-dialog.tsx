import React from "react";
import { DialogPrimitives } from "./dialog";

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  const { isOpen, onClose } = props;
  return (
    <DialogPrimitives.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitives.Portal>
        <DialogPrimitives.Overlay />
        <DialogPrimitives.Content className=" bg-white px-24 py-16  rounded-sm w-[calc(100vw-48px)] max-w-[440px]">
          hello
        </DialogPrimitives.Content>
      </DialogPrimitives.Portal>
    </DialogPrimitives.Root>
  );
};
