import { ComponentProps } from "react";

export function Checkbox(props: ComponentProps<"input">) {
  return <input type="checkbox" className="accent-primary-700" {...props} />;
}
