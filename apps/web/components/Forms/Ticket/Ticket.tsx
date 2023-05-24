import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../Input";
import { Button } from "../../Button";

const createTicketParser = z.object({
  title: z
    .string()
    .min(1, "Title should at least be 1 character long")
    .max(50, "Title should at most be 256 characters long"),

  description: z
    .string()
    .min(10, "Description should at least be 10 characters long")
    .max(256, "Description should at most be 256 characters long"),
});

export type CreateTicketData = z.input<typeof createTicketParser>;

interface TicketFormProps {
  onSubmit: (data: CreateTicketData) => Promise<void>;
}

export const TicketForm: FC<TicketFormProps> = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTicketData>({
    resolver: zodResolver(createTicketParser),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onReset={() => reset()}
      className="flex flex-col gap-4 w-full"
    >
      <Input label="Title" {...register("title")} error={errors.title?.message} />
      <Input
        label="Description"
        {...register("description")}
        error={errors.description?.message}
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
