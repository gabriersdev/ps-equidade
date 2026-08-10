import { classes } from "@/resources/classes";
import ClassCard from "@/components/class-card";

export default function AulasPage() {
  return (
    <div className={"mt-5"}>
      <h1 className="mb-4" style={{color: 'var(--primary-color)', letterSpacing: "-0.5px"}}>Aulas</h1>
      
      <div>
        {classes.map((aula) => (
          <ClassCard key={aula.id} aula={aula} />
        ))}
      </div>
    </div>
  );
}
