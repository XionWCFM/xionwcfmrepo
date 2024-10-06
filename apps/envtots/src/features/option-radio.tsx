import { createSafeContext } from "@xionwcfm/react";
import { Flex } from "@xionwcfm/xds/flex";
import { Radio } from "@xionwcfm/xds/radio";
import { atom, useAtom } from "jotai";
import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, memo, useMemo } from "react";

const TYPESCRIPT = "typescript";
const ZOD = "zod";

export type OptionsRadioValues = typeof TYPESCRIPT | typeof ZOD;

export const OptionRadio = ({
  value,
  onChange,
}: { value: OptionsRadioValues; onChange: (input: OptionsRadioValues) => void }) => {
  return (
    <Flex className=" w-[300px]">
      <Radio
        value={value}
        onChange={(e) => {
          onChange(e.target.value as OptionsRadioValues);
        }}
      >
        <Radio.Option value={TYPESCRIPT}>TypeScript</Radio.Option>
        <Radio.Option value={ZOD}>zod</Radio.Option>
      </Radio>
    </Flex>
  );
};

const [_Provider, useOptionRadio] =
  createSafeContext<[OptionsRadioValues, Dispatch<SetStateAction<OptionsRadioValues>>]>(null);

export const OptionRadioProvider = ({ children, initial }: PropsWithChildren<{ initial?: OptionsRadioValues }>) => {
  const memoizedAtom = useMemo(() => atom(initial ?? "typescript"), [initial]);
  return <_Provider value={useAtom(memoizedAtom)}>{children}</_Provider>;
};

OptionRadioProvider.Consumer = ({
  children,
}: { children: (value: [OptionsRadioValues, Dispatch<SetStateAction<OptionsRadioValues>>]) => ReactNode }) => {
  const value = useOptionRadio();
  if (value === null) throw new Error("");
  return children(value);
};

export { useOptionRadio };
