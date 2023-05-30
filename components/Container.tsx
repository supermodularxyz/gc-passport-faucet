import { PropsWithChildren } from "react";

export function Container({ children }: PropsWithChildren) {
  return <div className="max-w-screen-sm container mx-auto">{children}</div>;
}
