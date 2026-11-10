"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { APPLE_SPRING_SNAPPY } from "@/libs/apple-motion";
import type { NavItem } from "@/components/header-mobile-menu";

interface HeaderDesktopNavProps {
  items: NavItem[];
  pathname: string | null;
}

export function HeaderDesktopNav({ items, pathname }: HeaderDesktopNavProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <ul className="hidden items-center gap-2 lg:flex">
      {items.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <li key={item.href} className="relative">
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative inline-flex items-center rounded-sm px-3 py-2 text-sm font-bold transition-[transform,color,background-color] duration-100 ease-out active:scale-[0.97] ${
                isActive
                  ? "text-brand-tertiary"
                  : "text-brand-primary hover:bg-black/[0.04] hover:text-brand-tertiary"
              }`}
            >
              <span>{item.label}</span>
              {isActive && (
                <motion.span
                  layoutId={
                    prefersReducedMotion ? undefined : "header-nav-indicator"
                  }
                  transition={APPLE_SPRING_SNAPPY}
                  aria-hidden="true"
                  className="absolute right-3 bottom-0.5 left-3 h-0.5 rounded-full bg-brand-tertiary"
                />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

