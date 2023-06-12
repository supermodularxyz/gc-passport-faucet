"use client";

import { Children, PropsWithChildren } from "react";
import { clsx } from "clsx";

export function Panels({
  children,
  current,
  onNext,
}: PropsWithChildren & { current: number; onNext: () => void }) {
  const panels = Children.toArray(children);
  const isNextDisabled = (panels[current + 1] as any)?.props.disabled;
  const disabled = current === panels.length || isNextDisabled;

  return (
    <div className="flex flex-col items-center justify-center">
      <ol className="flex w-full justify-between mb-16">
        {panels.map((item: any, i) => (
          <li key={i}>
            <div className="flex justify-center mb-2">
              <div
                className={clsx(
                  "w-10 h-10 flex justify-center items-center rounded-full border-2 font-bold",
                  {
                    "border-secondary": i === current,
                    "border-border": i > current,
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
        <a
          href="#"
          onClick={() => {
            if (!disabled) onNext();
          }}
          className={clsx({
            "opacity-30 cursor-not-allowed": disabled,
          })}
        >
          Next
        </a>
      ) : null}
    </div>
  );
}

export function Panel(
  props: PropsWithChildren & { title: string; disabled?: boolean }
) {
  return <div className="mb-16">{props.children}</div>;
}
