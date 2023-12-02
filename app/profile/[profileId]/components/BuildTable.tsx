"use client";
import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/utils/tw";
import BuildTile from "./BuildTile";

interface BuildTableProps {
  characters: Character[];
  builds: BuildData[];
  profileId?: string;
  pathurl: string;
  likes?: any[] | null;
  authedUser: boolean;
}

const BuildTable: FC<BuildTableProps> = ({
  characters,
  builds,
  profileId,
  pathurl,
  likes,
  authedUser,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const displayBuilds = builds.filter((build) => {
    if (searchParams.get("class")) {
      return build.character.name === searchParams.get("class");
    } else {
      return true;
    }
  });

  const likedSorted = searchParams.get("sort");

  const onCharacterClick = (character: Character) => {
    if (searchParams.get("class") === character.name) {
      router.push(pathurl);
      router.refresh();
    } else {
      if (likedSorted) {
        router.push(`${pathurl}&class=${character.name}`);
        router.refresh();
      } else {
        router.push(`${pathurl}?class=${character.name}`);
        router.refresh();
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        {characters.map((character) => (
          <div className="flex-1" key={character.id}>
            <div className="group relative">
              <div className="absolute -inset-[2px] rounded-lg bg-white/50 opacity-75 blur transition duration-1000 group-hover:-inset-[4px] group-hover:opacity-100 group-hover:duration-200"></div>
              <Image
                key={character.id}
                className={cn(
                  "relative h-full w-full flex-1 cursor-pointer rounded-xl border-4 border-transparent bg-black group-hover:border-foreground-900/80",
                  {
                    "border-foreground-900/80":
                      searchParams.get("class") === character.name,
                  },
                )}
                src={character.image}
                alt="character image"
                height={100}
                width={100}
                onClick={() => onCharacterClick(character)}
              />
            </div>
          </div>
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
          <BuildTile
            key={build.id}
            build={build}
            isInitiallyLiked={likes?.includes(build.id)}
            authedUser={authedUser}
          />
        ))}
      </div>
    </div>
  );
};

export default BuildTable;
