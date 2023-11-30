"use client";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/utils/tw";
import BuildTile from "./BuildTile";

interface BuildTableProps {
  characters: Character[];
  builds: BuildData[];
  profileId: string;
}

const BuildTable: FC<BuildTableProps> = ({ characters, builds, profileId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const displayBuilds = builds.filter((build) => {
    if (searchParams.get("class")) {
      return build.character.name === searchParams.get("class");
    } else {
      return true;
    }
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {characters.map((character) => (
          <Image
            key={character.id}
            className={cn(
              "h-full w-full flex-1 cursor-pointer rounded-xl border-4 border-slate-300/30",
              {
                "border-slate-300/70":
                  searchParams.get("class") === character.name,
              },
            )}
            src={character.image}
            alt="character image"
            height={100}
            width={100}
            onClick={() => {
              if (searchParams.get("class") === character.name) {
                router.push(`/profile/${profileId}`);
              } else {
                router.push(`/profile/${profileId}?class=${character.name}`);
              }
            }}
          />
        ))}
      </div>
      <div className="relative flex items-center justify-center">
        <div className="absolute top-[50%] h-[1px] w-full -translate-y-[50%] bg-gray-500" />
        <p className="z-10 bg-background px-2 text-xs font-bold">
          PUBLISHED BUILDS
        </p>
      </div>
      <div className="flex flex-col gap-4">
        {displayBuilds.map((build) => (
          <BuildTile key={build.id} build={build} />
        ))}
      </div>
    </div>
  );
};

export default BuildTable;