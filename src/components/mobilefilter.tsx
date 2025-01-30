"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  SlidersHorizontal,
} from "lucide-react";

import FilterOnly from "./filter";

export default function Filter() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <button className="flex items-center px-4 py-2 rounded-md hover:bg-gray-200 focus:outline-none">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left">
          <FilterOnly />
        </SheetContent>
      </Sheet>
    </>
  );
}
