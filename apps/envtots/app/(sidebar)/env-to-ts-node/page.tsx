"use client";

import { Editor } from "@monaco-editor/react";
import { Box } from "@xionwcfm/xds/box";
import { Flex } from "@xionwcfm/xds/flex";
import { Spacing } from "@xionwcfm/xds/spacing";
import { Stack } from "@xionwcfm/xds/stack";
import { useCallback, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { createEnvDTs } from "~/features/create-env-d-ts";
import { createEnvToZod } from "~/features/create-env-to-zod";
import { OptionRadio, OptionRadioProvider } from "~/features/option-radio";
export default function Page() {
  return (
    <OptionRadioProvider>
      <Stack p={"16"}>
        <OptionRadioProvider.Consumer>
          {([value, onChange]) => <OptionRadio value={value} onChange={onChange} />}
        </OptionRadioProvider.Consumer>
        <Spacing h={"16"} />
        <OptionRadioProvider.Consumer>
          {([value]) => (
            <EditorSection
              onChange={(e) => {
                if (value === "typescript") {
                  return createEnvDTs(e, "node");
                }
                return createEnvToZod(e, "node");
              }}
            />
          )}
        </OptionRadioProvider.Consumer>
      </Stack>
    </OptionRadioProvider>
  );
}

type CreateEnvCodeFunction = (e: string) => { success: false } | { success: true; data: string };

const EditorSection = ({ onChange }: { onChange: CreateEnvCodeFunction }) => {
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");

  const dispatch = useCallback(
    (e: string | undefined) => {
      if (!e) {
        return;
      }
      const result = onChange(e);
      if (result.success) {
        setValue(result.data);
      }
    },
    [onChange],
  );

  const handleChange = (e: string | undefined) => {
    if (!e) {
      return;
    }
    setCode(e);
    dispatch(e);
  };

  useEffect(() => {
    dispatch(code);
  }, [dispatch]);

  return (
    <Flex gap={"32"} className=" h-[500px]">
      <Box className=" w-full">
        <Editor
          height="100%"
          defaultLanguage="Markdown"
          value={code}
          onChange={handleChange}
          theme="vs-light"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "monospace",
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
        />
      </Box>

      <Box className=" w-full">
        <SyntaxHighlighter language="typescript">{value}</SyntaxHighlighter>
      </Box>
    </Flex>
  );
};
