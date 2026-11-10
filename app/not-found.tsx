"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="sr-only">#404 - Página não encontrada!</h1>

      <h2 className="font-display m-0 flex flex-col items-center gap-1 text-brand-secondary">
        <span className="text-4xl font-semibold sm:text-5xl">#404</span>
        <span className="text-2xl font-semibold sm:text-3xl">
          Página não encontrada!
        </span>
      </h2>

      <p className="m-0 max-w-md text-base leading-[1.6] text-brand-ink/85">
        A página ainda não existe ou o endereço não está correto.
      </p>

      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-md border border-brand-primary bg-brand-primary px-5 py-2.5 text-sm font-medium text-white transition-[transform,background-color,border-color] duration-100 ease-out hover:border-brand-tertiary hover:bg-brand-tertiary active:scale-[0.97]"
      >
        Retornar para o início
      </Link>
    </div>
  );
}
