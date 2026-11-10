import type { Metadata } from "next";
import { dictionary } from "@/resources/dictionary";
import AnimatedComponents from "@/components/animated-component/animated-components";
import { PageHeading } from "@/components/page-heading";
import StudentPageLogin from "@/components/student-page/student-page-login";

export const metadata: Metadata = {
  title: dictionary.areaDoAluno.title,
};

export default function StudentPage() {
  return (
    <AnimatedComponents>
      <div className="mt-6 sm:mt-8">
        <PageHeading title="Área do aluno" />
        <StudentPageLogin />
      </div>
    </AnimatedComponents>
  );
}
