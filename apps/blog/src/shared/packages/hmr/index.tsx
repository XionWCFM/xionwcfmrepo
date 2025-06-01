"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function useHmr() {
  const router = useRouter();

  useEffect(() => {
    let ws: WebSocket | null = null;
    if (process.env.NODE_ENV === "development") {
      ws = new WebSocket("ws://localhost:3600");
      ws.onmessage = (event) => {
        if (event.data === "refresh") {
          router.refresh();
        }
      };
      return () => ws?.close();
    }
  }, [router]);
  return null;
}

export const AutoRefresh = () => {
  useHmr();
  return null;
};
