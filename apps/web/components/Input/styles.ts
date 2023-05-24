import { cva, VariantProps } from "class-variance-authority";

export const input = cva(
  [
    "block",
    "w-full",
    "rounded-md",
    "border-0",
    "py-1.5",
    "pr-10",
    "px-2",
    "ring-1",
    "ring-inset",
    "focus:ring-2",
    "focus:ring-inset",
    "sm:text-sm",
    "sm:leading-6",
    "focus:outline-none"
  ],
  {
    variants: {
      error: {
        true: [
          "text-red-900",
          "ring-red-300",
          "focus:ring-red-500",
          "placeholder:text-red-300",
        ],
        false: ["text-gray-900", "ring-gray-300", "focus:ring-indigo-600", "placeholder:text-gray-400"],
      },
    },
    defaultVariants: {
        error: false
    }
  },
);

export type InputVariant = VariantProps<typeof input>;