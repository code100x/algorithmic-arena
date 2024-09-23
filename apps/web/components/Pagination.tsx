// PaginationComponent.tsx
"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@repo/ui/pagination";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <Pagination className="mt-2">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className={
              currentPage === 1 ? "pointer-events-none opacity-50" : ""
            }
            aria-label="Previous Page"
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href="#"
            onClick={() => onPageChange(1)}
            isActive={currentPage === 1}
            aria-label="Page 1"
          >
            1
          </PaginationLink>
        </PaginationItem>
        {currentPage > 3 && <PaginationEllipsis />}
        {currentPage > 2 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
              aria-label={`Page ${currentPage - 1}`}
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage !== 1 && currentPage !== totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              isActive
              aria-label={`Page ${currentPage}`}
            >
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 1 && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(currentPage + 1)}
              aria-label={`Page ${currentPage + 1}`}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        )}
        {currentPage < totalPages - 2 && <PaginationEllipsis />}
        {currentPage !== totalPages && (
          <PaginationItem>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(totalPages)}
              aria-label={`Page ${totalPages}`}
            >
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className={
              currentPage === totalPages ? "pointer-events-none opacity-50" : ""
            }
            aria-label="Next Page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
