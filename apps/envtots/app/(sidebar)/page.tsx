"use client";

import Editor from "@monaco-editor/react";
import { Box } from "@xionwcfm/xds/box";
import { Flex } from "@xionwcfm/xds/flex";

import { Stack } from "@xionwcfm/xds/stack";
import { useState } from "react";
import { createEnvDTs } from "~/features/create-env-d-ts";

export default function Home() {
  const [code, setCode] = useState<string>("");
  const [value, setValue] = useState("");
  return (
    <Stack>
      <Flex gap={"32"} className=" h-[500px]">
        <Box className=" bg-primary-100 w-full">
          <Editor
            height="100%"
            defaultLanguage="Markdown"
            value={code}
            onChange={(e) => {
              if (!e) {
                return;
              }
              setCode(e);
              const result = createEnvDTs(e, "node");
              if (result.success) {
                setValue(result.data);
              }
            }}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "monospace",
            }}
          />
        </Box>

        <Box className=" w-full">
          <Editor
            height="100%"
            defaultLanguage="typescript"
            value={value}
            theme="vs-light"
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "monospace",
            }}
          />
        </Box>
      </Flex>
    </Stack>
  );
}
