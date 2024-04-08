"use client";
import clsx from "clsx";
import Link from "next/link";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
interface IMenuItemProps {
  path: string;
  title: string;
  icon: ReactNode;
}

const SidebarMenuItem = ({ path, icon, title }: IMenuItemProps) => {
  const pathname = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={clsx(
          "flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group",
          {
            "bg-gray-100 dark:bg-gray-700": path === pathname,
          }
        )}
      >
        {icon}
        <span className="ml-3">{title}</span>
      </Link>
    </li>
  );
};

export default SidebarMenuItem;
