"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FC, FormEvent, useCallback } from "react";
import { Input } from "../../Input";
import { Button } from "../../Button";

const updateSupportAgentParser = z.object({
  name: z
    .string()
    .min(5, "Name should be at least 5 characters long")
    .max(100, "Name should be at most 100 characters long"),

  email: z.string().email(),
});

export type UpdateSupportAgentData = z.input<typeof updateSupportAgentParser>;

interface UpdateSupportAgentFormProps {
  defaultValues: Partial<UpdateSupportAgentData>;
  onSubmit: (data: UpdateSupportAgentData) => Promise<void>;
  onReset: () => Promise<void>;
}

export const UpdateSupportAgentForm: FC<UpdateSupportAgentFormProps> = ({
  defaultValues,
  onSubmit,
  onReset
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateSupportAgentData>({
    resolver: zodResolver(updateSupportAgentParser),
    defaultValues,
  });

  const handleReset = useCallback((e: FormEvent) => {
    e.preventDefault();
    reset(defaultValues)
    return onReset();
  }, [reset, defaultValues, onReset]);

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
      <div className="flex flex-col-reverse xl:flex-row xl:justify-end gap-2 mt-4 xl:mt-2">
        <Button type="reset" intent="secondary">
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};
