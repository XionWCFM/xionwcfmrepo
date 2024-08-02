"use client";
import { type PropsWithChildren, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Portal = ({ children, id }: PropsWithChildren & { id: string }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);
  return mounted ? createPortal(children, document.getElementById(id) as HTMLElement) : null;
};
