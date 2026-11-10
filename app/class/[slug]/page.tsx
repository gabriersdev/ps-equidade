import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import moment from "moment";
import { classes } from "@/resources/classes";
import ClassCard from "@/components/class-card/class-card";
import AnimatedComponents from "@/components/animated-component/animated-components";
import { renderText } from "@/libs/render-text";
import { PageHeading } from "@/components/page-heading";
import { appConfigs } from "@/resources/resources";

moment.locale(appConfigs.locale);

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const aula = classes.find((c) => {
    const expectedSlug = c.date.split("/").reverse().join("");
    return expectedSlug === slug || c.id === slug;
  });
  return {
    title: aula ? `Aula ${aula.title}` : "Aula não encontrada",
  };
}

export default async function ClassPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const currentDate = moment();

  const aula = classes.find((c) => {
    const expectedSlug = c.date.split("/").reverse().join("");
    return expectedSlug === slug || c.id === slug;
  });

  if (!aula) {
    return notFound();
  }

  const nextClass = [...classes]
    .reverse()
    .find((c) => moment(c.date, "DD/MM/YYYY").isSameOrAfter(currentDate, "day"));
  const isNextClass = nextClass?.id === aula.id;

  return (
    <AnimatedComponents>
      <div className="mt-6 sm:mt-8">
        <PageHeading
          title={aula.title}
          subtitle={
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-brand-tertiary">
                {renderText(aula.date)}
              </span>
              {isNextClass ? (
                <span className="text-small inline-flex items-center rounded-md border border-brand-tertiary/30 bg-brand-tertiary/10 px-2 py-0.5 font-medium text-brand-primary">
                  próxima aula
                </span>
              ) : null}
            </div>
          }
        />
        <ClassCard aula={{ ...aula, title: "Conteúdo da aula", date: "" }} />
      </div>
    </AnimatedComponents>
  );
}
