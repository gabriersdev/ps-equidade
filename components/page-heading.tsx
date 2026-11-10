"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { breadcrumbTranslations } from "@/resources/dictionary";
import { renderText } from "@/libs/render-text";

interface PageHeadingProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "title"> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function PageHeading({
  title,
  subtitle,
  className = "",
  style,
  ...props
}: PageHeadingProps) {
  const pathname = usePathname();
  const segments = pathname ? pathname.split("/").filter(Boolean) : [];

  return (
    <div className="mb-6">
      <nav
        aria-label="Breadcrumb"
        className="text-small mb-3 flex flex-wrap items-center gap-1"
      >
        <Link
          href="/"
          className="font-medium text-brand-primary transition-[color,transform] duration-100 ease-out hover:text-brand-tertiary active:scale-[0.97]"
        >
          {breadcrumbTranslations["home"] || "Home"}
        </Link>

        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join("/")}`;

          let label: React.ReactNode;

          if (/^\d{8}$/.test(segment)) {
            const dateStr = `${segment.slice(6, 8)}/${segment.slice(4, 6)}/${segment.slice(0, 4)}`;
            label = renderText(dateStr);
          } else {
            label =
              breadcrumbTranslations[segment.toLowerCase()] ||
              segment
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
          }

          return (
            <React.Fragment key={href}>
              <span className="text-brand-secondary" aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-dot"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                </svg>
              </span>

              {isLast ? (
                <span className="font-medium text-brand-ink" aria-current="page">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="font-medium text-brand-primary transition-[color,transform] duration-100 ease-out hover:text-brand-tertiary active:scale-[0.97]"
                >
                  {label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </nav>

      <h1
        className={`font-display mb-2 text-3xl font-semibold text-brand-primary sm:text-4xl ${className}`}
        style={style}
        {...props}
      >
        {renderText(title)}
      </h1>

      {subtitle && <div className="mt-1">{subtitle}</div>}
    </div>
  );
}
