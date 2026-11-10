import type { Metadata } from "next";
import { dictionary } from "@/resources/dictionary";
import AnimatedComponents from "@/components/animated-component/animated-components";
import { PageHeading } from "@/components/page-heading";
import ResourceCard, {
  type ResourceCardProps,
} from "@/components/resource-card/resource-card";
import { educationalResourcesData } from "@/resources/educational-resources-data";

export const metadata: Metadata = {
  title: dictionary.header.resources,
};

export default async function ResourcesPage() {
  return (
    <AnimatedComponents>
      <div className="mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <PageHeading title="Recursos" />
        </div>

        <div>
          {[...educationalResourcesData].map(
            (resource: ResourceCardProps, index: number) => (
              <ResourceCard {...resource} key={index} />
            )
          )}
        </div>
      </div>
    </AnimatedComponents>
  );
}
