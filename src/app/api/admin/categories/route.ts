import { db } from "@/utils/firesbase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { NextResponse } from "next/server";

export interface ICategory {
  id: string;
  name: string;
  description: string;
  slug: string;
}

export async function POST(req: Request) {
  const data = await req.json();
  const newCategory = await addDoc(collection(db, "categories"), data);

  return NextResponse.json({
    newCategory: newCategory,
  });
}

export async function GET() {
  const dataRef = await getDocs(query(collection(db, "categories")));

  const categories = dataRef.docs.map((c) => ({ ...c.data(), id: c.id }));

  return NextResponse.json({
    data: categories,
  });
}
