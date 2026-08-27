import React, { ReactNode } from "react";

interface BaseCardProps {
  title: ReactNode;
  subtitle?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

export default function BaseCard({ title, subtitle, description, children }: BaseCardProps) {
  return (
    <div className={"card px-3 py-4 rounded-1 mb-3"}>
      <div className={"d-flex flex-column"}>
        <h2 className="fs-3 m-0 p-0" style={{color: 'var(--secondary-color)', letterSpacing: "-0.5px"}}>
          {title}
        </h2>
        {subtitle && (
          <div className={"d-flex align-items-center gap-1"}>
            {subtitle}
          </div>
        )}
      </div>
      
      {description && (
        <div className={"mt-3"}>
          <p className={"m-0 p-0 text-body"}>
            {description}
          </p>
        </div>
      )}
      
      {children && (
        <div className="mt-3 pt-1 d-flex flex-column gap-2">
          {children}
        </div>
      )}
    </div>
  );
}
