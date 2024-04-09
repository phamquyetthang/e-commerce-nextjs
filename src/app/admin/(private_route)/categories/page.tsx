import { ICategory } from "@/app/api/admin/categories/route";
import Search from "@/components/common/admin/Search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BASE_URL } from "@/constants/common";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

interface IProps{
  searchParams: {
    keyword: string
  }
}
const Categories = async ({searchParams}: IProps) => {
  const res = await fetch(`${BASE_URL}/api/admin/categories?${new URLSearchParams(searchParams)}`);
  const data = await res.json();

  const categories: Array<ICategory> = data.data;

  return (
    <div className="flex flex-col">
      <h3 className="my-4 mx-1 font-bold">Categories Table Data</h3>
      <Search />
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
      <Pagination className="mx-0 justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default Categories;
