import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";

const HeaderAdmin = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 items-center lg:px-6 py-2.5 dark:bg-gray-800 flex justify-between">
        <h2 className="text-black font-bold text-lg">Admin panel</h2>
        <div className="flex gap-4 items-center">
          <span>{session?.user.email}</span>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
