import { BASE_URL } from "@/constants/common";
import React from "react";

const Categories = async () => {
  const res = await fetch(`${BASE_URL}/api/admin/categories`);
  const data = await res.json();
  console.log("🚀 ~ Categories ~ data:", data);
  const categories = data.data;

  return <div>{JSON.stringify(categories)}</div>;
};

export default Categories;
