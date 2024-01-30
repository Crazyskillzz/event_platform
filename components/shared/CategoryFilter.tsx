"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CategoryFilter = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent className="z-10 mt-1 w-full bg-primary-400 py-2shadow-lg rounded-md">
        <SelectItem
          value="All"
          className=" select-item p-regular-14 w-full h-full p-20 flex items-center justify-center hover:bg-primary-50 hover:p-regular-16 hover:font-bold"
        >
          All
        </SelectItem>

        {categories.map((category) => (
          <SelectItem
            value={category.name}
            key={category._id}
            className=" select-item p-regular-14 w-full h-full p-20 flex items-center justify-center hover:bg-primary-50 hover:p-regular-16 hover:font-bold"
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CategoryFilter;
