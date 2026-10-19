import * as React from "react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconChevronRight, IconDots } from "@tabler/icons-react";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return <ul data-slot="pagination-content" className={cn("flex items-center gap-0.5", className)} {...props} />;
}

function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />;
}

function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size={size}
      className={cn(className)}
      nativeButton={false}
      render={
        <a aria-current={isActive ? "page" : undefined} data-slot="pagination-link" data-active={isActive} {...props} />
      }
    />
  );
}

function PaginationPrevious({ className, text = "Previous", ...props }) {
  return (
    <PaginationLink aria-label="Go to previous page" size="default" className={cn("ps-1.5!", className)} {...props}>
      <IconChevronLeft data-icon="inline-start" className="rtl:rotate-180" />
      <span className="hidden sm:block">{text}</span>
    </PaginationLink>
  );
}

function PaginationNext({ className, text = "Next", ...props }) {
  return (
    <PaginationLink aria-label="Go to next page" size="default" className={cn("pe-1.5!", className)} {...props}>
      <span className="hidden sm:block">{text}</span>
      <IconChevronRight data-icon="inline-end" className="rtl:rotate-180" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <IconDots />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
