"use client";
import { cn } from "@/utils/tw";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

interface BuildTableNavProps {}

const BuildTableNav: FC<BuildTableNavProps> = ({}) => {
  const pathname = usePathname();

  return (
    <div className="flex border-b border-gray-500 text-lg font-bold">
      <a
        href="/"
        className={cn("px-4 py-2 hover:text-foreground-900", {
          "border-b-2 border-b-foreground-900 text-foreground-900":
            pathname === "/",
        })}
      >
        New Builds
      </a>
      <a
        href="/liked"
        className={cn("px-4 py-2 hover:text-foreground-900", {
          "border-b-2 border-b-foreground-900 text-foreground-900":
            pathname === "/liked",
        })}
      >
        Liked Builds
      </a>
    </div>
  );
};

export default BuildTableNav;
