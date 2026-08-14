import {classes} from "@/resources/classes";
import ClassCard from "@/components/class-card/class-card";
import {notFound} from "next/navigation";
import React from "react";
import {Metadata} from "next";
import AnimatedComponents from "@/components/animated-component/animated-components";
import {renderText} from "@/libs/render-text";

export async function generateMetadata({params}: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const {slug} = await params;
  const aula = classes.find(c => {
    const expectedSlug = c.date.split('/').reverse().join('');
    return expectedSlug === slug || c.id === slug;
  });
  return {
    title: aula ? `Aula ${aula.title}` : "Aula não encontrada",
  };
}

export default async function ClassPage({params}: { params: Promise<{ slug: string }> }) {
  const {slug} = await params;
  
  const aula = classes.find(c => {
    const expectedSlug = c.date.split('/').reverse().join('');
    return expectedSlug === slug || c.id === slug;
  });
  
  if (!aula) {
    return notFound();
  }
  
  return (
    <AnimatedComponents>
      <div className="mt-5">
        <hgroup className={"mb-4"}>
          <h1 className="m-0 p-0" style={{color: 'var(--primary-color)', letterSpacing: "-0.5px"}}>{aula.title}</h1>
          <span className={"text-success"}>{renderText(aula.date)}</span>
        </hgroup>
        <ClassCard aula={{...aula, title: "Conteúdo da aula", date: ""}}/>
      </div>
    </AnimatedComponents>
  );
}
