import {Metadata} from "next";
import AnimatedComponents from "@/components/animated-component/animated-components";

export const metadata: Metadata = {
  title: "Área do Aluno",
};

export default function StudentPage() {
  return (
    <AnimatedComponents>
      <div className={"mt-5"}>
        <div className="alert alert-secondary rounded-1" role="alert">
          Ainda estamos trabalhando nesta seção...
        </div>
      </div>
    </AnimatedComponents>
  );
}
