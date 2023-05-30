import { ComponentProps, PropsWithChildren } from "react";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      className="px-4 py-3 bg-primary-800 text-primary-50 hover:opacity-80 cursor disabled:opacity-60"
      {...props}
    />
  );
}
