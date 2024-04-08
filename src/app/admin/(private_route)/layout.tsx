import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeaderAdmin from "@/components/layouts/admin/HeaderAdmin";
import SidebarAdmin from "@/components/layouts/admin/SidebarAdmin";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PrivateAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user || (session?.user as { role: string })?.role !== "admin")
    redirect("admin/auth");

  return (
    <div>
      <HeaderAdmin />
      <SidebarAdmin />
      <div className="fixed overflow-auto top-14 left-[250px] right-0 p-4 bg-white bottom-0">
        {children}
      </div>
    </div>
  );
}
