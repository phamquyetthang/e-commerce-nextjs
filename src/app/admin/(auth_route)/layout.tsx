import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function PrivateAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (session?.user) redirect("/admin");

  return <>{children}</>;
}
