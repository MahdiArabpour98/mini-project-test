"use client";

import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function HandlePagination({ page = 1, perPage = 10, total = 0 }) {
  const lastPage = Math.ceil(+total / +perPage);

  const searchParams = useSearchParams();

  const router = useRouter();

  const pushQuery = (p = null) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      page: p,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      },
    );

    router.push(url);
  };

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious onClick={() => pushQuery(page - 1)} text="قبلی" />
          </PaginationItem>
        )}

        {page > 2 && (
          <PaginationItem>
            <PaginationLink onClick={() => pushQuery(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {page > 3 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page > 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => pushQuery(page - 1)}>{page - 1}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink isActive>{page}</PaginationLink>
        </PaginationItem>

        {page < lastPage && (
          <PaginationItem>
            <PaginationLink onClick={() => pushQuery(page + 1)}>{page + 1}</PaginationLink>
          </PaginationItem>
        )}

        {page < lastPage - 2 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {page < lastPage - 1 && (
          <PaginationItem>
            <PaginationLink onClick={() => pushQuery(lastPage)}>{lastPage}</PaginationLink>
          </PaginationItem>
        )}

        {page < lastPage && (
          <PaginationItem>
            <PaginationNext onClick={() => pushQuery(page + 1)} text="بعدی" />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
