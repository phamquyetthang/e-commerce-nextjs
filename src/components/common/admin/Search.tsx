"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const onSearch = () => {
    const params = new URLSearchParams(searchParams);

    if (keyword) {
      params.set("keyword", keyword);
    } else {
      params.delete("keyword");
    }

    replace(`${pathname}?${params.toString()}`)
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2 mb-8">
      <Input
        value={keyword}
        onChange={handleChange}
        type="text"
        placeholder="Type your keyword"
      />
      <Button type="submit" onClick={onSearch}>
        Search
      </Button>
    </div>
  );
}
