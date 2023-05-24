import { cva, VariantProps } from "class-variance-authority";

export const banner = cva("my-4 py-2 px-4 text-lg rounded text-center", {
    variants: {
        color: {
            error: ["text-red-900", "bg-red-200"]
        }
    }
});

export type BannerStyleProps = VariantProps<typeof banner>;