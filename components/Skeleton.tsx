import { PropsWithChildren } from "react";

export function Skeleton({
  children,
  isLoading,
}: PropsWithChildren & { isLoading: boolean }) {
  return isLoading ? (
    <div className="w-12 mt-4 flex items-end animate-pulse bg-white/50" />
  ) : (
    <>{children}</>
  );
}
