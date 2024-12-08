"use client";

import { MdxViewer } from "@repo/mdx";

export default function Page() {
  return (
    <div>
      <MdxViewer source="## Hello World **hello**" />
    </div>
  );
}
