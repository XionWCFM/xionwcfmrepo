"use client";
import { ReactContextError } from "@xionwcfm/error/internal-error";
import { Box } from "@xionwcfm/ui/box";
import { Button } from "@xionwcfm/ui/button";

export default function Home() {
  return (
    <div className="">
      <button
        className=" bg-primary-50"
        type="button"
        onClick={() => {
          throw new ReactContextError("error", "Home");
        }}
      >
        클릭
      </button>
      <Box>
        <div className="">ds</div>
        <div className="">dsa</div>
      </Box>
      <Button className=" " appName="hello">
        hello
      </Button>
      <button type="button">sda</button>
    </div>
  );
}
