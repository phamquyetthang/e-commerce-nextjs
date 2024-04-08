import React from "react";
import { BiSolidCategory } from "react-icons/bi";
import { FaList, FaShoppingCart, FaUserFriends } from "react-icons/fa";
import SidebarMenuItem from "./SidebarMenuItem";

const SidebarAdmin = () => {
  return (
    <aside
      id="default-sidebar"
      className="fixed top-50 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidenav"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <ul className="space-y-2">
          <SidebarMenuItem
            icon={<BiSolidCategory />}
            path="/admin/categories"
            title="Categories"
          />
          <SidebarMenuItem
            icon={<FaList />}
            path="/admin/products"
            title="Products"
          />
          <SidebarMenuItem
            icon={<FaShoppingCart />}
            path="/admin/orders"
            title="Order"
          />
        </ul>
        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
          <SidebarMenuItem
            icon={<FaUserFriends />}
            path="/admin/managers"
            title="Managers"
          />
        </ul>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
