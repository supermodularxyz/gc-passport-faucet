import { ComponentProps } from "react";

export function Button(props: ComponentProps<"button">) {
  return (
    <button
      className="px-4 py-3 text-sm bg-primary-900 hover:bg-primary-700  border-primary-500 rounded text-primary-50 transition-color cursor disabled:opacity-60 disabled:pointer-events-none"
      {...props}
    />
  );
}
