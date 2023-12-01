"use client";
import { cn } from "@/utils/tw";
import { usePathname, useSearchParams } from "next/navigation";
import { FC } from "react";

interface ProfileBuildTableNavProps {}

const ProfileBuildTableNav: FC<ProfileBuildTableNavProps> = ({}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // console.log("searchParams", searchParams);
  // console.log("pathname", pathname);

  return (
    <div className="flex border-b border-gray-500 text-lg font-bold">
      <a
        href="/profile"
        className={cn("px-4 py-2 hover:text-foreground-900", {
          "border-b-2 border-b-foreground-900 text-foreground-900":
            searchParams.get("sort") !== "liked",
        })}
      >
        New Builds
      </a>
      <a
        href="/profile?sort=liked"
        className={cn("px-4 py-2 hover:text-foreground-900", {
          "border-b-2 border-b-foreground-900 text-foreground-900":
            searchParams.get("sort") === "liked",
        })}
      >
        Liked Builds
      </a>
    </div>
  );
};

export default ProfileBuildTableNav;
