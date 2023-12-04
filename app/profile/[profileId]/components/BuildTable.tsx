"use client";
import { FC, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { cn } from "@/utils/tw";
import BuildTile from "./BuildTile";
import { createClient } from "@/utils/supabase/client";
import { PAGINATION_LIMIT } from "@/utils/contants";
import { useIntersection } from "@mantine/hooks";

interface BuildTableProps {
  characters: Character[];
  builds: BuildData[];
  profileId?: string;
  pathurl: string;
  likes?: any[] | null;
  authedUser: boolean;
  likedFilter: boolean;
  userId: string | null;
}

const BuildTable: FC<BuildTableProps> = ({
  characters,
  builds,
  profileId,
  pathurl,
  likes,
  authedUser,
  likedFilter,
  userId,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lastPostRef = useRef<HTMLElement>(null);
  const { entry, ref } = useIntersection({
    root: lastPostRef.current,
    threshold: 1,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [displayBuilds, setDisplayBuilds] = useState<any[]>(builds);
  const supabase = createClient();

  useEffect(() => {
    setDisplayBuilds(builds);
    setCurPage(1);
  }, [builds]);

  useEffect(() => {
    setCurPage(1);
  }, []);

  useEffect(() => {
    // if (likedFilter) return;
    if (entry?.isIntersecting) {
      const fetchMoreBuilds = async () => {
        let result: any;
        if (likedFilter) {
          if (searchParams.get("class")) {
            const { data, error: likedBuildsError } = await supabase
              .from("build_likes")
              .select(
                `*, build:builds(*, like_count:build_likes(count), skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*))`,
              )
              .eq("user", userId)
              .range(
                curPage * PAGINATION_LIMIT * 5,
                (curPage + 1) * PAGINATION_LIMIT * 5,
              );
            result = {
              builds: data!
                .map((build: any) => build.build)
                .filter((build) => build.type === searchParams.get("class")),
            };
            if (result.length > 0) {
              setCurPage((prev) => prev + 1);
            }
          } else {
            const { data, error: likedBuildsError } = await supabase
              .from("build_likes")
              .select(
                `*, build:builds(*, like_count:build_likes(count), skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*))`,
              )
              .eq("user", userId)
              .range(
                curPage * PAGINATION_LIMIT * 5,
                (curPage + 1) * PAGINATION_LIMIT * 5,
              );
            result = { builds: data!.map((build: any) => build.build) };
            if (result.length > 0) {
              setCurPage((prev) => prev + 1);
            }
          }
        } else {
          if (searchParams.get("class")) {
            console.log("classss");
            const { data, error } = await supabase
              .from("builds")
              .select(
                `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
              )
              .eq("type", searchParams.get("class"))
              .eq("user", userId)
              .order("id", { ascending: false })
              .range(
                curPage * PAGINATION_LIMIT,
                (curPage + 1) * PAGINATION_LIMIT,
              );
            result = data!;
            if (result.length > 0) {
              setCurPage((prev) => prev + 1);
            }
          } else {
            const { data, error } = await supabase
              .from("builds")
              .select(
                `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
              )
              .eq("user", userId)
              .order("id", { ascending: false })
              .range(
                curPage * PAGINATION_LIMIT,
                (curPage + 1) * PAGINATION_LIMIT,
              );
            result = data!;
            if (result.length > 0) {
              setCurPage((prev) => prev + 1);
            }
          }
        }
        if (result.length > 0) {
          setDisplayBuilds((prev) => [...prev, ...result]);
        }

        setIsFetching(false);
      };
      setIsFetching(true);
      fetchMoreBuilds();
    }
  }, [entry]);

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
        {displayBuilds.map((build, idx) => {
          if (idx === displayBuilds.length - 1) {
            return (
              <div ref={ref} key={build.id}>
                <BuildTile
                  build={build}
                  isInitiallyLiked={likes?.includes(build.id)}
                  authedUser={authedUser}
                />
              </div>
            );
          } else {
            return (
              <BuildTile
                key={build.id}
                build={build}
                isInitiallyLiked={likes?.includes(build.id)}
                authedUser={authedUser}
              />
            );
          }
        })}
        {isFetching && (
          <div className="flex justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-foreground-900" />
          </div>
        )}
      </div>
      <div className="from-bg100 fixed bottom-0 left-0 h-24 w-full bg-gradient-to-t to-transparent" />
    </div>
  );
};

export default BuildTable;
