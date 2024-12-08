"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@xionwcfm/xds";
import { UnderlineInput } from "@xionwcfm/xds/underline-input";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page() {
  return (
    <Stack h={"screen"} justify={"center"} items={"center"}>
      <LoginForm />
    </Stack>
  );
}

const LoginForm = () => {
  const form = useForm<FormState>({
    resolver: zodResolver(schema),
  });

  const _handleSubmit = form.handleSubmit((_data) => {});

  return (
    <Stack>
      <form className="flex min-h-screen flex-col justify-center gap-y-64 w-screen p-32 ">
        <UnderlineInput {...form.register("email")} placeholder={"email"} />
        <UnderlineInput {...form.register("password")} placeholder={"password"} />
      </form>
    </Stack>
  );
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormState = z.infer<typeof schema>;
