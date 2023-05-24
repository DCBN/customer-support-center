import { cva, VariantProps } from "class-variance-authority";

export const button = cva("rounded font-semibold px-3 py-1.5 text-sm shadow-sm", {
  variants: {
    intent: {
      primary: [
        "bg-indigo-600",
        "hover:bg-indigo-500",
        "text-white",
        "focus-visible:outline",
        "focus-visible:outline-2",
        "focus-visible:outline-offset-2",
        "focus-visible:outline-indigo-600"
      ],
      secondary: [
        "bg-white",
        "hover:bg-gray-100",
        "text-gray-900",
        "ring-1",
        "ring-inset",
        "ring-gray-300",
      ],
    },
  },
  defaultVariants: {
    intent: "primary"
  }
});

export type ButtonVariant = VariantProps<typeof button>