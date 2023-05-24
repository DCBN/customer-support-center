"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FC, FormEvent, useCallback } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button";

const addSupportAgentParser = z.object({
  name: z
    .string()
    .min(5, "Name should be at least 5 characters long")
    .max(100, "Name should be at most 100 characters long"),

  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password should be at least 8 characters long")
    .max(25, "Password should be at most 25 characters long"),
  confirmPassword: z.string().min(1, 'Confirming your password is required'),
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Your passwords does not match'
}).transform(({ confirmPassword, ...data}) => data);

type AddSupportAgentInputData = z.input<typeof addSupportAgentParser>;
export type AddSupportAgentData = z.output<typeof addSupportAgentParser>

interface AddSupportAgentFormProps {
  onSubmit: (data: AddSupportAgentData) => Promise<void>;
  onReset: () => Promise<void>;
}

export const AddSupportAgentForm: FC<AddSupportAgentFormProps> = ({
  onSubmit,
  onReset,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddSupportAgentInputData>({
    resolver: zodResolver(addSupportAgentParser),
  });

  const handleReset = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      reset();
      return onReset();
    },
    [reset, onReset]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={handleReset}
      className="flex flex-col gap-4 w-full"
    >
      <Input label="Name" {...register("name")} error={errors.name?.message} />
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
      <Input
        type="password"
        label="Confirm Password"
        {...register("confirmPassword")}
        error={errors.confirmPassword?.message}
      />
      <div className="flex flex-col-reverse xl:flex-row xl:justify-end gap-2 mt-4 xl:mt-2">
        <Button type="reset" intent="secondary">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
