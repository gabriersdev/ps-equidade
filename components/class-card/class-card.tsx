"use client";

import { useEffect, useState } from "react";
import { renderText } from "@/libs/render-text";
import type { Aula } from "@/resources/classes";
import ClassCardLink from "@/components/class-card/class-card-link";
import { basicClasses } from "@/resources/classes-data";
import BaseCard from "@/components/base-card/base-card";

interface ClassCardProps {
  aula: Aula;
}

function parseClassDate(dateStr: string): number {
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    return new Date(
      Number(parts[2]),
      Number(parts[1]) - 1,
      Number(parts[0])
    ).getTime();
  }
  return 0;
}

export default function ClassCard({ aula }: ClassCardProps) {
  const [isNext, setIsNext] = useState(false);

  useEffect(() => {
    if (!aula.date) return;

    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const todayTime = now.getTime();

    let nextClassDateStr: string | null = null;
    let minFutureTime = Infinity;

    for (const c of basicClasses) {
      if (!c.date) continue;
      const cTime = parseClassDate(c.date);
      if (cTime >= todayTime && cTime < minFutureTime) {
        minFutureTime = cTime;
        nextClassDateStr = c.date;
      }
    }

    setIsNext(aula.date === nextClassDateStr);
  }, [aula.date]);

  return (
    <BaseCard
      title={aula.title}
      subtitle={
        <>
          {isNext && (
            <span className="text-small inline-flex items-center rounded-md border border-brand-tertiary/30 bg-brand-tertiary/10 px-2 py-0.5 font-medium text-brand-primary">
              próxima aula
            </span>
          )}
          {aula.date && (
            <span className="text-sm font-medium text-brand-secondary">
              {renderText(aula.date)}
            </span>
          )}
        </>
      }
      description={aula.description}
    >
      {aula.contents.length > 0 &&
        aula.contents.map((content, idx) => (
          <ClassCardLink key={idx} content={content} />
        ))}
    </BaseCard>
  );
}
