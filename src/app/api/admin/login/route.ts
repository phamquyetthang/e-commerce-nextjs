import { db } from "@/utils/firesbase";
import { comparePassword } from "@/utils/password";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "@/constants/common";

export const POST = async (request: Request) => {
  const data = await request.json();
  const { email, password, remember } = data;

  if (!email) {
    return NextResponse.json({ message: "missing email" }, { status: 403 });
  }

  const adminExisted = await getDocs(
    query(collection(db, "admins"), where("email", "==", email))
  );

  if (adminExisted.docs.length === 0) {
    return NextResponse.json(
      { message: "This account is not exist" },
      { status: 403 }
    );
  }

  const adminExistedData = adminExisted.docs[0].data();

  const hashedPassword = adminExistedData.password;

  const isMatchPassword = await comparePassword(
    String(password),
    hashedPassword
  );

  if (!isMatchPassword) {
    return NextResponse.json({ message: "Wrong password" }, { status: 403 });
  }

  const tokenObj = {
    email: adminExistedData.email,
    sub: adminExisted.docs[0].id,
  };
  return NextResponse.json({
    message: "success",
    token: jwt.sign(tokenObj, SECRET_JWT_KEY, {
      expiresIn: remember ? undefined : '2 days',
    }),
  });
};
