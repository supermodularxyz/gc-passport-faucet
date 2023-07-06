import { createComponent } from ".";
import { tv } from "tailwind-variants";

const button = tv({
  base: "inline-flex justify-center items-center tracking-wide text-gray-50 rounded active:opacity-90 transition-opacity disabled:cursor-default disabled:opacity-60 disabled:pointer-events-none",
  variants: {
    color: {
      default:
        "border bg-button-light text-button-dark border-primary hover:opacity-80",
      primary: "bg-button-dark text-button-light hover:opacity-80",
    },
    size: {
      sm: "p-2 text-sm",
      md: "px-8 py-3 text-md",
      lg: "px-8 py-4 text-lg",
      icon: ["px-1 py-1"],
    },
    disabled: {
      true: "opacity-50 pointer-events-none",
    },
  },
  defaultVariants: {
    size: "md",
    color: "default",
  },
});

export const Button = createComponent("button", button);
