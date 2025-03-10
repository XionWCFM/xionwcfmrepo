"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { Database } from "@repo/database/typesDb";
import { MdxEditor } from "@repo/mdx/editor";
import { ErrorBoundary } from "@suspensive/react";
import { Debounce } from "@xionwcfm/react";
import { Flex, Spacing, Stack } from "@xionwcfm/xds";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
const MdxViewer = dynamic(() => import("@repo/mdx").then((mod) => mod.MdxViewer), { ssr: false });

type Post = Database["public"]["Tables"]["posts"]["Row"];

const schema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
  release_date: z.string(),
  category: z.string(),
  autohrity: z.string(),
});

type FormState = z.infer<typeof schema>;

export default function Page() {
  const _form = useForm({
    resolver: zodResolver(schema),
  });

  const [markdown, setMarkdown] = useState("");

  return (
    <Stack className=" p-16  w-screen">
      <Flex className=" w-full p-16 gap-x-16 min-h-[70vh]">
        <Stack className=" w-[45%] border-[1.5px] rounded-md border-neutral-500 py-16 pr-16">
          <MdxEditor content={markdown} onChange={(value) => setMarkdown(value)} />
        </Stack>

        <Stack className=" w-full rounded-md border-[1.5px] border-neutral-500 px-16">
          <Debounce value={markdown} delay={500}>
            {({ debounced }) => (
              <ErrorBoundary
                fallback={() => {
                  return <Stack>error</Stack>;
                }}
              >
                <MdxViewer source={debounced} />
              </ErrorBoundary>
            )}
          </Debounce>
        </Stack>
      </Flex>
      <Spacing className=" h-[200px]" />
    </Stack>
  );
}
