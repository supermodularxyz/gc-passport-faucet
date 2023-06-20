"use client";

import { Children, PropsWithChildren } from "react";
import { clsx } from "clsx";
import { Button } from "./ui/Button";

export function Panels({
  children,
  current,
  onNext,
}: PropsWithChildren & { current: number; onNext: () => void }) {
  const panels = Children.toArray(children);
  const isNextDisabled = (panels[current + 1] as any)?.props.disabled;
  const disabled = current === panels.length || isNextDisabled;

  return (
    <div className="flex flex-col items-center relative justify-between flex-1">
      <div className="absolute h-[1px] bg-border w-4/5 top-5 " />
      <ol className="flex w-full justify-between mb-16">
        {panels.map((item: any, i) => (
          <li key={i} className="z-10">
            <div className="flex justify-center mb-2">
              <div
                className={clsx(
                  "w-10 h-10 flex justify-center items-center rounded-full border-2 font-bold",
                  {
                    "border-secondary bg-background": i === current,
                    "border-border bg-background": i > current,
                    "bg-disabled border-disabled  text-background ":
                      current > i,
                  }
                )}
              >
                {i + 1}
              </div>
            </div>
            <div
              className={clsx({
                "text-secondary font-bold": i === current,
                "text-disabled": current > i,
              })}
            >
              {item.props.title}
            </div>
          </li>
        ))}
      </ol>
      {panels[current]}

      {current < panels.length - 1 ? (
        // Hide last Next button
        <Button color="primary" href="#" disabled={disabled} onClick={onNext}>
          Next
        </Button>
      ) : (
        <div />
      )}
    </div>
  );
}

export function Panel(
  props: PropsWithChildren & { title: string; disabled?: boolean }
) {
  return <div className="mb-16">{props.children}</div>;
}
