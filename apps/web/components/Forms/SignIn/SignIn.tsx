"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FC } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button";

const signInParser = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters long")
    .max(25, "Password should be at most 25 characters long"),
});

export type SignInData = z.output<typeof signInParser>

interface SignInFormProps {
  onSubmit: (data: SignInData) => Promise<void>;
}

export const SignInForm: FC<SignInFormProps> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInData>({
    resolver: zodResolver(signInParser),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 w-full"
    >
      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        type="password"
        label="Password"
        {...register("password")}
        error={errors.password?.message}
      />
      <div className="flex mt-4 xl:mt-2">
        <Button type="submit" className="w-full">Sign In</Button>
      </div>
    </form>
  );
};
