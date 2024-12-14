"use client";

import { MdxEditor } from "@repo/mdx/editor";
import { Debounce } from "@xionwcfm/react";
import { Flex, Stack } from "@xionwcfm/xds";
import dynamic from "next/dynamic";
import { useState } from "react";

const MdxViewer = dynamic(() => import("@repo/mdx").then((mod) => mod.MdxViewer), { ssr: false });

export default function Page() {
  const [markdown, setMarkdown] = useState("");

  return (
    <Flex className="p-32" w={"screen"} h={"screen"} gap={"16"}>
      <Stack className="w-full">
        <MdxEditor content={markdown} onChange={(value) => setMarkdown(value)} />
      </Stack>
      <Stack className="w-full border rounded-sm px-16">
        <Debounce value={markdown} delay={2500}>
          {({ debounced }) => <MdxViewer source={debounced} />}
        </Debounce>
      </Stack>
    </Flex>
  );
}
