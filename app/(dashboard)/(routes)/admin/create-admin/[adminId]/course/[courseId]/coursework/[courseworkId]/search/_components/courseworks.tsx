"use client";

import { Coursework } from "@prisma/client";
import { CourseworkItem } from "./coursework-item";

interface CourseworkItemProps {
  items: Coursework[];
}
export const Courseworks = ({ items }: CourseworkItemProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CourseworkItem key={item.id} label={item.title} value={item.id} />
      ))}
    </div>
  );
};
