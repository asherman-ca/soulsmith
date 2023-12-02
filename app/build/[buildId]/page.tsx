import { createClient } from "@/utils/supabase/server";
import { Tooltip } from "@nextui-org/react";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import DeleteButton from "./components/DeleteButton";
import NoteSection from "./components/NoteSection";
import LikeButton from "@/components/LikeButton";

type BuildProps = {
  params: {
    buildId: string;
  };
};

export const dynamic = "force-dynamic";

const page = async ({ params: { buildId } }: BuildProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: buildData, error: buildFetchError } = await supabase
    .from("builds")
    .select(
      `*,
      skills:build_skills(skill:skills(*)),
      character:characters(*),
      weapon:weapons(*),
      profile:profiles(*),
      likes:build_likes(*)`,
    )
    .eq("id", buildId);

  const result: BuildData = buildData![0];

  if (!result) {
    return <div className="page-container">Build not found</div>;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let initialLike = false;

  if (user) {
    const { data: likesData, error: likesError } = await supabase
      .from("build_likes")
      .select("*")
      .eq("user", user.id)
      .eq("build", buildId);

    likesData!.length > 0 && (initialLike = true);
  }

  console.log("like", initialLike);

  return (
    <div className="page-container">
      <div className="content-container">
        <h3 className="flex items-center text-xs" aria-label="builder header">
          Soulstone Survivors
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            Builds
          </span>
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            {result.name}
          </span>
        </h3>

        <div className="flex flex-col">
          <div className="flex flex-col gap-2 rounded-t-md bg-gray-800 p-4">
            <p className="text-xs text-foreground/50">
              Soulstone Survivors {result.character.name} Build
            </p>
            <p className="text-lg font-bold">{result.name}</p>
          </div>
          <div className="flex items-center gap-4 rounded-b-md bg-gray-800/70 p-4 text-xs">
            <Link href={`/profile/${result.profile.id}`} className="">
              by{" "}
              <span className="font-bold text-primary/80">
                {result.profile.username || result.profile.id}
              </span>
            </Link>
            <LikeButton
              buildId={buildId}
              initialLike={initialLike}
              initialLikes={result.likes.length}
              type={"buildid"}
              authedUser={!!user}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-md bg-gray-800 p-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-4">
                <h2 className="font-bold">CHARACTER</h2>
                <div className="h-24 w-24 rounded-md border-4 border-slate-300/30">
                  <Tooltip
                    placement="bottom"
                    color="default"
                    classNames={{
                      base: ["border-2 rounded-md border-gray-500 w-44"],
                      content: ["p-2 rounded-md text-xs"],
                    }}
                    content={
                      <div className="flex flex-col gap-1">
                        <h1 className="text-base font-medium">
                          {result.character.name}
                        </h1>
                        <h2>{result.character.tags}</h2>
                      </div>
                    }
                  >
                    <Image
                      className="rounded-md"
                      src={result.character.image}
                      alt="character image"
                      height={100}
                      width={100}
                    />
                  </Tooltip>
                </div>
              </div>
              {result.weapon?.image && (
                <div className="h-16 w-16 rounded-md border-4 border-slate-300/30">
                  <Tooltip
                    placement="bottom"
                    color="default"
                    classNames={{
                      base: ["border-2 rounded-md border-gray-500"],
                      content: ["p-2 rounded-md text-xs"],
                    }}
                    content={
                      <div className="flex flex-col gap-1">
                        <h1 className="text-base font-medium">
                          {result.weapon.name}
                        </h1>
                        {result.weapon.stats &&
                          result.weapon.stats
                            .split(",")
                            .map((weaponStat: string) => {
                              return <p key={result.weapon.id}>{weaponStat}</p>;
                            })}
                      </div>
                    }
                  >
                    <Image
                      className="rounded-md"
                      src={result.weapon.image}
                      alt="weapon image"
                      height={100}
                      width={100}
                    />
                  </Tooltip>
                </div>
              )}
            </div>

            {result.skills.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold">SKILLS</h2>
                <div className="flex gap-4">
                  {result.skills.map(({ skill }, idx) => (
                    <div
                      key={`${skill.id} - ${idx}`}
                      className="h-16 w-16 rounded-md border-4 border-slate-300/30"
                    >
                      <Tooltip
                        placement="bottom"
                        color="default"
                        classNames={{
                          base: ["border-2 rounded-md border-gray-500 w-60"],
                          content: ["p-2 rounded-md text-xs"],
                        }}
                        content={
                          <div className="flex flex-col gap-1">
                            <div className="flex items-end justify-between font-medium">
                              <h1 className="text-base">{skill.name}</h1>
                              <p>{skill.cooldown}s</p>
                            </div>
                            <p>{skill.description}</p>
                          </div>
                        }
                      >
                        <Image
                          className="rounded-md"
                          src={skill.image}
                          alt="skill image"
                          height={100}
                          width={100}
                        />
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 rounded-md bg-gray-800 p-4">
          <p className="text-sm font-bold">BUILD NOTES</p>
          {result?.description && (
            <NoteSection description={result.description} />
          )}
        </div>

        {user && user.id === result.user && <DeleteButton buildId={buildId} />}
      </div>
    </div>
  );
};

export default page;
