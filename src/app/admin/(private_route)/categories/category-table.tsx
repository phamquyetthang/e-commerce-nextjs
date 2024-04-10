import { ICategory } from "@/app/api/admin/categories/route";
import PaginationTable from "@/components/common/admin/PaginationTable";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/constants/common";
import { IPaginationRes } from "@/types/common";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

interface IProps {
  searchParams: {
    keyword: string;
  };
}

const CategoryTable = async ({ searchParams }: IProps) => {
  const res = await fetch(
    `${BASE_URL}/api/admin/categories?${new URLSearchParams(searchParams)}`,
    { cache: "no-cache" }
  );
  const data: IPaginationRes<ICategory> = await res.json();

  const categories: Array<ICategory> = data.data;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Category ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.id}</TableCell>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.description}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell className="flex gap-4 justify-end">
                <Button variant="outline" size="icon">
                  <Pencil />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash2 />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationTable total={data.meta.total} size={5} />
    </>
  );
};

export default CategoryTable;
