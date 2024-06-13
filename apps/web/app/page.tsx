import { add } from "@repo/math/add";
import { Button } from "@repo/ui/button";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {add(1, 2)}
      <Button appName="hello">hello</Button>
      <button type="button">sda</button>
    </div>
  );
}
