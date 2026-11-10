"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { dictionary } from "@/resources/dictionary";
import { appConfigs } from "@/resources/resources";
import { HeaderMobileMenu, type NavItem } from "@/components/header-mobile-menu";
import { HeaderDesktopNav } from "@/components/header-desktop-nav";

const navItems: NavItem[] = [
  { label: dictionary.header.aulas, href: "/classes" },
  { label: dictionary.header.calendario, href: "/calendar" },
  { label: dictionary.header.resources, href: "/resources" },
  ...(appConfigs.features.studentAreaEnabled
    ? [{ label: dictionary.header.areaDoAluno, href: "/student-page" }]
    : []),
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 4);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`apple-chrome-header sticky top-0 z-40 border-b transition-colors duration-150 ${
        isScrolled ? "border-black/15" : "border-black/10"
      }`}
    >
      <nav
        aria-label="Navegação principal"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className="inline-flex flex-col items-start gap-1 rounded-md transition-transform duration-100 ease-out active:scale-[0.97]"
        >
          <Image src="/logo-ps-geral-transparente.png" alt="Logo do Programa Sabará" width={80} height={45} className="object-cover" loading="eager" />
          <span className="text-small font-medium text-brand-tertiary">Equidade Racial</span>
        </Link>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-controls="navbarContent"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/15 bg-white/70 text-brand-ink transition-[transform,background-color] duration-100 ease-out hover:bg-white active:scale-[0.95] lg:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
            {isMenuOpen ? (
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            ) : (
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            )}
          </svg>
        </button>

        <HeaderDesktopNav items={navItems} pathname={pathname} />
      </nav>

      <HeaderMobileMenu isOpen={isMenuOpen} items={navItems} pathname={pathname} onClose={() => setIsMenuOpen(false)} />

      <div
        aria-hidden="true"
        className={`pointer-events-none absolute right-0 -bottom-3 left-0 h-3 bg-gradient-to-b from-black/[0.05] to-transparent transition-opacity duration-150 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />
    </header>
  );
}
