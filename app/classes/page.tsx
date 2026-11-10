import type { Metadata } from "next";
import { classes } from "@/resources/classes";
import { dictionary } from "@/resources/dictionary";
import ClassCard from "@/components/class-card/class-card";
import AnimatedComponents from "@/components/animated-component/animated-components";
import { PageHeading } from "@/components/page-heading";

export const metadata: Metadata = {
  title: dictionary.aulas.title,
};

export default async function AulasPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const sort =
    typeof resolvedParams.sort === "string" ? resolvedParams.sort : "date-desc";

  const sortedClasses = [...classes].sort((a, b) => {
    const aDate = a.date.split("/").reverse().join("");
    const bDate = b.date.split("/").reverse().join("");

    if (sort === "date-asc") {
      return aDate.localeCompare(bDate);
    } else if (sort === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (sort === "title-desc") {
      return b.title.localeCompare(a.title);
    }
    return bDate.localeCompare(aDate);
  });

  return (
    <AnimatedComponents>
      <div className="mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PageHeading title="Aulas" />
        </div>

        <div>
          {sortedClasses.map((aula) => (
            <ClassCard key={aula.id} aula={aula} />
          ))}
        </div>
      </div>
    </AnimatedComponents>
  );
}
