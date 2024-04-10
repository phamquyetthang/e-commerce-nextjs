import Search from "@/components/common/admin/Search";
import React, { Suspense } from "react";
import CategoryTable from "./category-table";
import TableSkeleton from "@/components/common/admin/table-skeleton";

interface IProps {
  searchParams: {
    keyword: string;
    page: string;
    size: string;
  };
}

const Categories = async ({ searchParams }: IProps) => {
  return (
    <div className="flex flex-col">
      <h3 className="my-4 mx-1 font-bold">Categories Table Data</h3>
      <Search />
      <Suspense
        key={searchParams.keyword + searchParams.page}
        fallback={<TableSkeleton />}
      >
        <CategoryTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Categories;
