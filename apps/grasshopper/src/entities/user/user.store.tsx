"use client";
import { createSafeAtom } from "@xionwcfm/jotai";
import { atomWithStorage } from "jotai/utils";
import { PropsWithChildren } from "react";
import { UserType } from "./model/user.model";

const STORAGE_KEY_USER_STORE = "storage-key-user-store";

const userAtom = atomWithStorage(STORAGE_KEY_USER_STORE, { userName: "" } satisfies UserType);

export const userStore = createSafeAtom(userAtom);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  return <userStore.Provider>{children}</userStore.Provider>;
};
