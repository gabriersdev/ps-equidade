"use client";

import {renderText} from "@/libs/render-text";
import type {Aula} from "@/resources/classes";
import ClassCardLink from "@/components/class-card/class-card-link";
import {Badge} from "react-bootstrap";
import {basicClasses} from "@/resources/classes-data";
import {useEffect, useState} from "react";

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
    <div className={"card px-3 py-4 rounded-1 mb-3"}>
      <div className={"d-flex flex-column"}>
        <h2 className="fs-3 m-0 p-0" style={{color: 'var(--secondary-color)', letterSpacing: "-0.5px"}}>
          {aula.title}
        </h2>
        <div className={"d-flex align-items-center gap-1"}>
          {isNext && (
            <span style={{paddingTop: "0.125rem", paddingBottom: "0.125rem"}} className={"bg-success-subtle fw-normal text-sm rounded-1 px-2 text-success"}>próxima aula</span>
          )}
          <span className={"text-danger"}>{renderText(aula.date)}</span>
        </div>
      </div>
      
      <div className={"mt-3"}>
        <p className={"m-0 p-0 text-body"}>
          {aula.description}
        </p>
      </div>
      
      {aula.contents.length > 0 && (
        <div className="mt-3 pt-1 d-flex flex-column gap-2">
          {aula.contents.map((content, idx) => (
            <ClassCardLink key={idx} content={content}/>
          ))}
        </div>
      )}
    </div>
  );
}
