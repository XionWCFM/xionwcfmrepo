"use client";

import { Editor } from "@monaco-editor/react";
import { Box } from "@xionwcfm/xds/box";
import { Flex } from "@xionwcfm/xds/flex";
import { Spacing } from "@xionwcfm/xds/spacing";
import { Stack } from "@xionwcfm/xds/stack";
import { useEffect, useState } from "react";
import { createEnvDTs } from "~/features/create-env-d-ts";
import { createEnvToZod } from "~/features/create-env-to-zod";
import { OptionRadio, OptionRadioProvider, OptionsRadioValues } from "~/features/option-radio";

export default function Page() {
  return (
    <OptionRadioProvider>
      <Stack p={"16"}>
        <OptionRadioProvider.Consumer>
          {([value, onChange]) => <OptionRadio value={value} onChange={onChange} />}
        </OptionRadioProvider.Consumer>
        <Spacing h={"16"} />
        <OptionRadioProvider.Consumer>{([value]) => <EditorSection setting={value} />}</OptionRadioProvider.Consumer>
      </Stack>
    </OptionRadioProvider>
  );
}

const EditorSection = ({ setting }: { setting: OptionsRadioValues }) => {
  const [code, setCode] = useState("");
  const [value, setValue] = useState("");

  const handleChange = (e: string | undefined) => {
    if (!e) {
      return;
    }

    setCode(e);
    const result = setting === "typescript" ? createEnvDTs(e, "node") : createEnvToZod(e, "node");

    if (result.success) {
      setValue(result.data);
    }
  };

  useEffect(() => {
    if (setting === "typescript") {
      const result = createEnvDTs(code, "node");
      if (result.success) {
        setValue(result.data);
      }
    }
    if (setting === "zod") {
      const result = createEnvToZod(code, "node");
      if (result.success) {
        setValue(result.data);
      }
    }
  }, [setting]);

  return (
    <Flex gap={"32"} className=" h-[500px]">
      <Box className=" bg-primary-100 w-full">
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
  );
};
