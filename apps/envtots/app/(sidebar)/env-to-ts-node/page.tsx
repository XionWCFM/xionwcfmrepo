"use client";

import { Stack } from "@xionwcfm/xds/stack";
import { OptionRadio, OptionRadioProvider } from "~/features/option-radio";

export default function Page() {
  return (
    <OptionRadioProvider>
      <Stack p={"16"}>
        <OptionRadioProvider.Consumer>
          {([value, onChange]) => <OptionRadio value={value} onChange={onChange} />}
        </OptionRadioProvider.Consumer>
      </Stack>
    </OptionRadioProvider>
  );
}
