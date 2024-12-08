"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, FixedBottom, FixedBottomCta, Stack } from "@xionwcfm/xds";
import { JustifyEnd } from "@xionwcfm/xds/justify-end";
import { toast } from "@xionwcfm/xds/toast";
import { UnderlineInput } from "@xionwcfm/xds/underline-input";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function Page() {
  return (
    <Stack h={"screen"} justify={"center"} items={"center"}>
      <LoginForm />
    </Stack>
  );
}

const LoginForm = memo(() => {
  const form = useForm<FormState>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = form.handleSubmit((data) => {
    toast.success(data.email);
  });

  return (
    <Stack>
      <form onSubmit={handleSubmit} className="flex min-h-screen flex-col justify-center gap-y-64 w-screen p-32 ">
        <UnderlineInput {...form.register("email")} placeholder={"email"} />
        <UnderlineInput {...form.register("password")} placeholder={"password"} />
        <SubmitButton />
      </form>
    </Stack>
  );
});

const SubmitButton = () => {
  return (
    <Stack>
      <JustifyEnd>
        <Button className="hidden md:block" type="submit" variant={"emphasis"} size={"lg"}>
          로그인
        </Button>
      </JustifyEnd>

      <FixedBottom>
        <FixedBottomCta className="md:hidden" type="submit">
          로그인
        </FixedBottomCta>
      </FixedBottom>
    </Stack>
  );
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type FormState = z.infer<typeof schema>;
