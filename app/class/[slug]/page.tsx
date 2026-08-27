import {classes} from "@/resources/classes";
import ClassCard from "@/components/class-card/class-card";
import {notFound} from "next/navigation";
import React from "react";
import {Metadata} from "next";
import AnimatedComponents from "@/components/animated-component/animated-components";
import {renderText} from "@/libs/render-text";
import {PageHeading} from "@/components/page-heading";
import moment from "moment";
import {appConfigs} from "@/resources/resources";

moment.locale(appConfigs.locale);

export const dynamic = 'force-dynamic';

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
  const currentDate = moment();
  
  const aula = classes.find(c => {
    const expectedSlug = c.date.split('/').reverse().join('');
    return expectedSlug === slug || c.id === slug;
  });
  
  if (!aula) {
    return notFound();
  }
  
  // Find the earliest class that hasn't happened yet
  const nextClass = [...classes].reverse().find(c => moment(c.date, 'DD/MM/YYYY').isSameOrAfter(currentDate, 'day'));
  const isNextClass = nextClass?.id === aula.id;
  
  return (
    <AnimatedComponents>
      <div className="mt-5">
        <PageHeading
          title={aula.title}
          subtitle={
            <div className={"d-flex align-items-center gap-1"}>
              <span className="text-success">{renderText(aula.date)}</span>
              {isNextClass ? (<span style={{paddingTop: "0.125rem", paddingBottom: "0.125rem"}} className={"bg-success-subtle fw-normal text-sm rounded-1 px-2 text-success"}>próxima aula</span>) : null}
            </div>
          }
        />
        <ClassCard aula={{...aula, title: "Conteúdo da aula", date: ""}}/>
      </div>
    </AnimatedComponents>
  );
}
