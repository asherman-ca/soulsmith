import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import BuildTable from "./components/BuildTable";

export const dynamic = "force-dynamic";

type ProfileProps = {
  params: {
    profileId: string;
  };
};

const page = async ({ params }: ProfileProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `*, builds:builds(*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*)))`,
    )
    .eq("id", params.profileId);

  // const { data: buildData, error: buildError } = await supabase
  //   .from("builds")
  //   .select(
  //     `*,
  //   skills:build_skills(skill:skills(*)),
  //   character:characters(*),
  //   weapon:weapons(*)`,
  //   )
  //   .eq("user", profileId);

  // console.log("builds", buildData);

  const { data: characterData, error: characterError } = await supabase
    .from("characters")
    .select("*");

  const result: any = data![0];
  const result2: any = characterData!;
  const dateString = result.builds[result.builds.length - 1].created_at;
  const dateObject = new Date(dateString);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  // console.log(result.builds);
  console.log(params);

  return (
    <div className="page-container">
      <div className="content-container">
        <h3 className="flex items-center text-xs" aria-label="builder header">
          Soulstone Survivors
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            Profile
          </span>
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            {result.username || params.profileId}
          </span>
        </h3>

        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold">
            {result.username || params.profileId}'s Builds
          </h2>
          <p className="text-xs">
            {result.builds.length} builds •{" "}
            <span className="text-gray-400">Last updated on</span>{" "}
            <span>{formattedDate}</span>
          </p>
        </div>

        <div>
          <BuildTable
            characters={result2}
            builds={result.builds}
            profileId={params.profileId}
          />
          {/* {characterData.map((character: Character) => (
            <Image
              src={character.image}
              alt="character image"
              height={100}
              width={100}
              className="h-16 w-16"
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default page;
