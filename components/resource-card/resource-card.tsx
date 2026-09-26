import React from "react";
import BaseCard from "@/components/base-card/base-card";
import ClassCardLink from "@/components/class-card/class-card-link";
import type {ClassContent} from "@/resources/classes";
import {renderText} from "@/libs/render-text";

export interface ResourceCardProps {
  title: string;
  description?: string;
  links?: ClassContent[];
}

export default function ResourceCard({title, description, links}: ResourceCardProps) {
  return (
    <BaseCard
      title={renderText(title)}
      description={renderText(description)}
    >
      {links && links.length > 0 && links.map((link, idx) => (
        <ClassCardLink key={idx} content={link}/>
      ))}
    </BaseCard>
  );
}
