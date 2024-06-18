"use client";
import { Button } from "@xionwcfm/ui/button";
import { ReactContextError } from "../../../packages/error/dist/internal-error";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <button
        type="button"
        onClick={() => {
          throw new ReactContextError("error", "Home");
        }}
      >
        클릭
      </button>
      <Button appName="hello">hello</Button>
      <button type="button">sda</button>
    </div>
  );
}
