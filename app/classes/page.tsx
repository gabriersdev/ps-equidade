import {classes} from "@/resources/classes";
import ClassCard from "@/components/class-card/class-card";
import {Metadata} from "next";
import AnimatedComponents from "@/components/animated-component/animated-components";
import {PageHeading} from "@/components/page-heading";

export const metadata: Metadata = {
  title: "Aulas",
};

export default async function AulasPage({
                                          searchParams,
                                        }: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const sort = typeof resolvedParams.sort === 'string' ? resolvedParams.sort : 'date-desc';
  
  const sortedClasses = [...classes].sort((a, b) => {
    const aDate = a.date.split('/').reverse().join('');
    const bDate = b.date.split('/').reverse().join('');
    
    if (sort === 'date-asc') {
      return aDate.localeCompare(bDate);
    } else if (sort === 'title-asc') {
      return a.title.localeCompare(b.title);
    } else if (sort === 'title-desc') {
      return b.title.localeCompare(a.title);
    }
    // default date-desc
    return bDate.localeCompare(aDate);
  });
  
  return (
    <AnimatedComponents>
      <div className={"mt-5"}>
        <div className={"d-flex align-items-center justify-content-between gap-3 flex-wrap"}>
          <PageHeading title="Aulas"/>
          
          <div className={"d-flex align-items-center justify-content-center gap-2 mb-3"}>
            <div></div>
          </div>
        </div>
        
        <div>
          {sortedClasses.map((aula) => (
            <ClassCard key={aula.id} aula={aula}/>
          ))}
        </div>
      </div>
    </AnimatedComponents>
  );
}
