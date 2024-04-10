"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface IProps {
  total: number;
  size: number;
}
const PaginationTable = ({ total, size }: IProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const totalPage = Math.round(total / size);

  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set("size", String(size));
    replace(`${pathname}?${params.toString()}`);
  }, [pathname, replace, searchParams, size]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setPage(Number(params.get("page") || 1));
  }, [searchParams]);

  const paramsObj = useMemo(() => {
    const obj: Record<string, string> = {};
    const params = new URLSearchParams(searchParams);
    params.forEach((value, key) => {
      obj[key] = value;
    });

    return obj;
  }, [searchParams]);

  const nearPageArray = useMemo(() => {
    const min = page - 2 > 0 ? page - 2 : 1;
    const max = page + 2 < totalPage ? page + 2 : totalPage;

    return Array.from({ length: max - min + 1 }).map((_, index) => min + index);
  }, [page, totalPage]);

  return (
    <Pagination className="mx-0 justify-end">
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href={{
                pathname: pathname,
                query: {
                  ...paramsObj,
                  page: page - 1,
                },
              }}
            />
          </PaginationItem>
        )}
        {nearPageArray.map((nearPage) => (
          <PaginationItem key={nearPage}>
            <PaginationLink
              href={{
                pathname: pathname,
                query: {
                  ...paramsObj,
                  page: nearPage,
                },
              }}
              isActive={page === nearPage}
            >
              {nearPage}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page * size < total && (
          <PaginationItem>
            <PaginationNext
              href={{
                pathname: pathname,
                query: {
                  ...paramsObj,
                  page: page + 1,
                },
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationTable;
