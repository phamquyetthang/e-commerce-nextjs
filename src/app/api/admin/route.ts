import { IAdminDb } from "@/models/admin";
import { db } from "@/utils/firesbase";
import { hashPassword } from "@/utils/password";
import { addDoc, collection } from "firebase/firestore";
import { NextResponse } from "next/server";

interface ICreateAdminReq extends Omit<IAdminDb, "isActive"> {}

export const POST = async (request: Request) => {
  const data = await request.json();
  console.log("data body", data);
  const { email, password } = data;
  if (!email || !password) {
    return NextResponse.json(
      { message: "missing email or password" },
      { status: 403 }
    );
  }

  const hashedPassword = await hashPassword(String(password));
  const newAdmin = await addDoc(collection(db, "admins"), {
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ admin: newAdmin });
};
