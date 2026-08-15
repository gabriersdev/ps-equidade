"use client";

import React from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {breadcrumbTranslations} from '@/resources/dictionary';
import {renderText} from '@/libs/render-text';

// @ts-ignore
interface PageHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export function PageHeading({title, subtitle, className = '', style, ...props}: PageHeadingProps) {
  const pathname = usePathname();
  const segments = pathname ? pathname.split('/').filter(Boolean) : [];
  
  return (
    <div className="mb-4">
      <div className="mb-3 text-sm d-flex flex-wrap gap-1 align-items-center">
        <Link href="/" className="text-decoration-none" style={{color: 'var(--primary-color)'}}>
          {breadcrumbTranslations['home'] || 'Home'}
        </Link>
        
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          
          let label: React.ReactNode;
          
          if (/^\d{8}$/.test(segment)) {
            const dateStr = `${segment.slice(6, 8)}/${segment.slice(4, 6)}/${segment.slice(0, 4)}`;
            label = renderText(dateStr);
          } else {
            label = breadcrumbTranslations[segment.toLowerCase()] || segment
              .split('-')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          }
          
          return (
            <React.Fragment key={href}>
              <span className="text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
                  <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                </svg>
              </span>
              
              {isLast ? (
                <span className="text-body fw-medium">
                  {label}
                </span>
              ) : (
                <Link
                  href={href}
                  className="text-decoration-none"
                  style={{color: 'var(--primary-color)'}}
                >
                  {label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <h1
        className={`mb-2 ${className}`}
        style={{color: 'var(--primary-color)', letterSpacing: "-0.5px", ...style}}
        {...props}
      >
        {title}
      </h1>
      {subtitle && <div className="mt-n1">{subtitle}</div>}
    </div>
  );
}
