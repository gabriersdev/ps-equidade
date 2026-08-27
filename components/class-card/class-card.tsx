"use client";

import {renderText} from "@/libs/render-text";
import type {Aula} from "@/resources/classes";
import ClassCardLink from "@/components/class-card/class-card-link";
import {basicClasses} from "@/resources/classes-data";
import {useEffect, useState} from "react";
import BaseCard from "@/components/base-card/base-card";

interface ClassCardProps {
  aula: Aula;
}

export default function ClassCard({aula}: ClassCardProps) {
  const [isNext, setIsNext] = useState(false);
  
  useEffect(() => {
    if (!aula.date) return;
    
    const parseDate = (dateStr: string) => {
      const parts = dateStr.split('/');
      if (parts.length === 3) {
        return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).getTime();
      }
      return 0;
    };
    
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const todayTime = now.getTime();
    
    let nextClassDateStr: string | null = null;
    let minFutureTime = Infinity;
    
    for (const c of basicClasses) {
      if (!c.date) continue;
      const cTime = parseDate(c.date);
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
            <span style={{paddingTop: "0.125rem", paddingBottom: "0.125rem"}} className={"bg-success-subtle fw-normal text-sm rounded-1 px-2 text-success"}>próxima aula</span>
          )}
          <span className={"text-danger"}>{renderText(aula.date)}</span>
        </>
      }
      description={aula.description}
    >
      {aula.contents.length > 0 && aula.contents.map((content, idx) => (
        <ClassCardLink key={idx} content={content}/>
      ))}
    </BaseCard>
  );
}
