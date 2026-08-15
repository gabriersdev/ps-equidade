import {Metadata} from "next";
import AnimatedComponents from "@/components/animated-component/animated-components";
import {PageHeading} from "@/components/page-heading";
import StudentPageLogin from "@/components/student-page/student-page-login";

export const metadata: Metadata = {
  title: "Área do Aluno",
};

export default function StudentPage() {
  return (
    <AnimatedComponents>
      <div className={"mt-5"}>
        <PageHeading title="Área do aluno"/>
        <StudentPageLogin/>
      </div>
    </AnimatedComponents>
  );
}
