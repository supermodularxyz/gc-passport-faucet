import { ComponentProps } from "react";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      className="px-8 py-3 text-md bg-primary hover:opacity-80 rounded-full text-white font-bold transition-opacity cursor disabled:opacity-60 disabled:pointer-events-none"
      {...props}
    />
  );
}
