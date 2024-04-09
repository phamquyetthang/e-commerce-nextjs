import { db } from "@/utils/firesbase";
import {
  addDoc,
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams;
  const keyword = search.get("keyword");
  const dataRef = await getDocs(
    query(
      collection(db, "categories"),
      orderBy("name"),
      startAt(keyword),
      endAt(keyword + "\uf8ff")
    )
  );

  const categories = dataRef.docs.map((c) => ({ ...c.data(), id: c.id }));

  return NextResponse.json({
    data: categories,
  });
}
