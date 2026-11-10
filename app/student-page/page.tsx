import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dictionary } from "@/resources/dictionary";
import { appConfigs } from "@/resources/resources";
import AnimatedComponents from "@/components/animated-component/animated-components";
import { PageHeading } from "@/components/page-heading";
import StudentPageLogin from "@/components/student-page/student-page-login";

export async function generateMetadata(): Promise<Metadata> {
  if (!appConfigs.features.studentAreaEnabled) {
    return {
      title: "Página não encontrada",
    };
  }
  return {
    title: dictionary.areaDoAluno.title,
  };
}

export default function StudentPage() {
  if (!appConfigs.features.studentAreaEnabled) {
    notFound();
  }

  return (
    <AnimatedComponents>
      <div className="mt-6 sm:mt-8">
        <PageHeading title="Área do aluno" />
        <StudentPageLogin />
      </div>
    </AnimatedComponents>
  );
}
