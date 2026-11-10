import React, { type ReactNode } from "react";
import { renderText } from "@/libs/render-text";

interface BaseCardProps {
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export default function BaseCard({
  title,
  subtitle,
  description,
  children,
}: BaseCardProps) {
  return (
    <article className="mb-4 rounded-lg border border-black/10 bg-white px-5 py-6 sm:px-6">
      <div className="flex flex-col">
        <h2 className="font-display m-0 p-0 text-2xl font-semibold text-brand-secondary">
          {renderText(title)}
        </h2>
        {subtitle && (
          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            {renderText(subtitle)}
          </div>
        )}
      </div>

      {description && (
        <div className="mt-3">
          <p className="m-0 p-0 text-base leading-[1.6] text-brand-ink/85">
            {renderText(description)}
          </p>
        </div>
      )}

      {children && (
        <div className="mt-4 flex flex-col gap-2 pt-1">{children}</div>
      )}
    </article>
  );
}
