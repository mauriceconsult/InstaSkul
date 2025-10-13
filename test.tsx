// D:\lms\components\test.tsx
"use client";
import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

export const Test: FC = () => {
  return (
    <Link href="/">
      <Image src="/test.jpg" alt="Test" width={100} height={100} />
    </Link>
  );
};
