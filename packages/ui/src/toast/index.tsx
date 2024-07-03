"use client";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { useIsomorphicLayoutEffect } from "@xionwcfm/hooks/use-isomorphic-layout-effect";
import { Pubsub } from "@xionwcfm/pubsub";
import { type ReactNode, useReducer } from "react";
const TOAST_TIMEOUT_DEFAULT = 1_500;

type ToastEvent = "add" | "delete" | "clear";
type ToastOption = "success" | "error" | "warning";
export type ToastType = {
  id: string;
  content: ReactNode;
  option: ToastOption;
  time: number;
};

type AddAction = {
  type: "add";
  payload: ToastType;
};

type DeleteAction = {
  type: "delete";
  payload: { id: string };
};

type ToastAction = AddAction | DeleteAction;

type ToastParamType = Partial<Pick<ToastType, "content" | "option" | "time">>;

type ToastOmitOptionType = Omit<ToastParamType, "option">;

const toastPubsub = new Pubsub<ToastEvent>();

export const toast = {
  show: (param: ToastParamType) => {
    toastPubsub.publish<ToastParamType>("add", param);
  },
  delete: (id: string) => {
    toastPubsub.publish<DeleteAction["payload"]>("delete", { id });
  },
  success: (param: ToastOmitOptionType) => {
    toastPubsub.publish<ToastParamType>("add", { ...param, option: "success" });
  },
  error: (param: ToastOmitOptionType) => {
    toastPubsub.publish<ToastParamType>("add", { ...param, option: "error" });
  },
  warning: (param: ToastOmitOptionType) => {
    toastPubsub.publish<ToastParamType>("add", { ...param, option: "warning" });
  },
};

const initialState: ToastType[] = [];

const reducer = (state: ToastType[], action: ToastAction): ToastType[] => {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((toast) => toast.id !== action.payload.id);
    default:
      return state;
  }
};

export const Toaster = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useIsomorphicLayoutEffect(() => {
    const addHandler = async (toast: ToastParamType) => {
      const id = Math.random().toString(36).substring(7);
      const title = toast.content ?? "";
      const option = toast.option ?? "success";
      const time = toast.time ?? 1500;
      dispatch({ type: "add", payload: { id, content: title, option, time } });
    };

    const deleteHandler = (id: ToastType["id"]) => {
      dispatch({ type: "delete", payload: { id } });
    };

    toastPubsub.subscribe("add", addHandler);
    toastPubsub.subscribe("delete", deleteHandler);
    return () => {
      toastPubsub.unsubscribe("add", addHandler);
      toastPubsub.unsubscribe("delete", deleteHandler);
    };
  }, []);

  return (
    <ToastPrimitives.Provider duration={TOAST_TIMEOUT_DEFAULT}>
      {state.map((toast) => (
        <ToastPrimitives.Root key={toast.id} duration={toast.time}>
          <ToastPrimitives.Title className=" bg-purple-50 ">{toast.content}</ToastPrimitives.Title>
        </ToastPrimitives.Root>
      ))}
      <ToastPrimitives.Viewport className=" fixed bottom-0 left-[50%] translate-x-[-50%]  flex flex-col gap-y-16" />
    </ToastPrimitives.Provider>
  );
};
