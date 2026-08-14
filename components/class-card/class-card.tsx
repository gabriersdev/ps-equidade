"use client";

import {renderText} from "@/libs/render-text";
import type {Aula} from "@/resources/classes";
import ClassCardLink from "@/components/class-card/class-card-link";

interface ClassCardProps {
  aula: Aula;
}

export default function ClassCard({aula}: ClassCardProps) {
  return (
    <div className={"card px-3 py-4 rounded-1 mb-3"}>
      <div className={"d-flex flex-column"}>
        <h2 className="fs-3 m-0 p-0" style={{color: 'var(--secondary-color)', letterSpacing: "-0.5px"}}>
          {aula.title}
        </h2>
        <span className={"text-danger"}>{renderText(aula.date)}</span>
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
