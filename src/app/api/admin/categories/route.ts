import { IPaginationRes } from "@/types/common";
import { db } from "@/utils/firesbase";
import {
  addDoc,
  collection,
  endAt,
  getDocs,
  orderBy,
  query,
  startAt,
  count,
  getCountFromServer,
  startAfter,
  limit,
  Query,
  Timestamp,
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
  const newCategory = await addDoc(collection(db, "categories"), {...data, createAt: Timestamp.now()});

  return NextResponse.json({
    newCategory: newCategory,
  });
}

export async function GET(
  req: NextRequest
): Promise<NextResponse<IPaginationRes<ICategory>>> {
  const search = req.nextUrl.searchParams;
  const keyword = search.get("keyword");
  const size = Number(search.get("size") || 5);
  const page = Number(search.get("page") || 1);

  const collectionRef = collection(db, "categories");
  const queriesArr = [];

  if (keyword) {
    queriesArr.push(
      orderBy("name"),
      startAt(keyword),
      endAt(keyword + "\uf8ff")
    );
  }

  if (page > 1) {
    const lastVisibleCategory = await getLastVisibleDoc(
      query(collectionRef, ...queriesArr),
      page,
      size
    );

    queriesArr.push(startAfter(lastVisibleCategory));
  }
  
  const dataRef = await getDocs(
    query(collectionRef, ...queriesArr, limit(size))
  );

  // 0, 1, 2 , 3, 4, 5..., 10, ... n

  const categories: ICategory[] = dataRef.docs.map((c) => ({
    ...c.data(),
    id: c.id,
  })) as ICategory[];

  const totalSnapshot = await getCountFromServer(collectionRef);

  return NextResponse.json({
    meta: {
      total: totalSnapshot.data().count,
    },
    data: categories,
  });
}

const getLastVisibleDoc = async (
  queryRef: Query,
  page: number,
  size: number
) => {
  const querySnapshot = await getDocs(
    query(queryRef, limit((page - 1) * size))
  );

  return querySnapshot.docs[querySnapshot.docs.length - 1];
};
