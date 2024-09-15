"use client";
import { createSafeAtom } from "@xionwcfm/jotai";
import { atom } from "jotai";
import { PropsWithChildren } from "react";
import { UserType } from "./model/user.model";

const userAtom = atom({ userName: "" } satisfies UserType);

export const userStore = createSafeAtom(userAtom);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  return <userStore.Provider>{children}</userStore.Provider>;
};
