"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  APPLE_REDUCED_TRANSITION,
  APPLE_SPRING_SNAPPY,
} from "@/libs/apple-motion";

export interface NavItem {
  label: string;
  href: string;
}

interface HeaderMobileMenuProps {
  isOpen: boolean;
  items: NavItem[];
  pathname: string | null;
  onClose: () => void;
}

export function HeaderMobileMenu({
  isOpen,
  items,
  pathname,
  onClose,
}: HeaderMobileMenuProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="navbarContent"
          role="region"
          aria-label="Menu de navegação"
          initial={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scaleY: 0.94, y: -6 }
          }
          animate={
            prefersReducedMotion
              ? { opacity: 1 }
              : { opacity: 1, scaleY: 1, y: 0 }
          }
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, scaleY: 0.94, y: -6 }
          }
          transition={
            prefersReducedMotion ? APPLE_REDUCED_TRANSITION : APPLE_SPRING_SNAPPY
          }
          style={{ transformOrigin: "top right" }}
          className="apple-chrome-panel border-t border-black/10 lg:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {items.map((item) => {
              const isActive =
                pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-semibold transition-[transform,background-color,color] duration-100 ease-out active:scale-[0.98] ${
                      isActive
                        ? "bg-brand-tertiary/10 pl-4 text-brand-tertiary"
                        : "text-brand-primary hover:bg-black/[0.04] hover:text-brand-tertiary"
                    }`}
                  >
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute top-1.5 bottom-1.5 left-1.5 w-0.5 rounded-full bg-brand-tertiary"
                      />
                    )}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

