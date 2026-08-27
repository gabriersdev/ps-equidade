import {Metadata} from "next";
import AnimatedComponents from "@/components/animated-component/animated-components";
import {PageHeading} from "@/components/page-heading";
import ResourceCard, {ResourceCardProps} from "@/components/resource-card/resource-card";
import React from "react";
import {educationalResourcesData} from "@/resources/educational-resources-data";

export const metadata: Metadata = {
  title: "Recursos",
};

export default async function ResourcesPage() {
  return (
    <AnimatedComponents>
      <div className={"mt-5"}>
        <div className={"d-flex align-items-center justify-content-between gap-3 flex-wrap"}>
          <PageHeading title="Recursos"/>
        </div>
        
        <div>
          {
            [...educationalResourcesData].map((resource: ResourceCardProps, index: number) => (
              <ResourceCard {...resource} key={index}/>
            ))
          }
        </div>
      </div>
    </AnimatedComponents>
  );
}
