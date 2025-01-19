import { ReactNode } from "react";

export function TypographyH1({ children }: { children: ReactNode }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
}

export function TypographyP({ children }: { children: ReactNode }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographyBlockquote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

export function TypographyLarge({ children }: { children: ReactNode }) {
  return <div className="text-lg font-semibold">{children}</div>;
}
