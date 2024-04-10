import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const TableSkeleton = () => {
  return (
    <div className="flex flex-col w-full">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index}  className="w-full h-[40px] my-2 rounded" />
      ))}
    </div>
  );
};

export default TableSkeleton;
