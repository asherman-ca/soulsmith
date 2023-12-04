import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import React from "react";
import BuildTable from "./components/BuildTable";
import { PAGINATION_LIMIT } from "@/utils/contants";

export const dynamic = "force-dynamic";

type ProfileProps = {
  params: {
    profileId: string;
  };
  searchParams: {
    class: string;
  };
};

const page = async ({ params, searchParams }: ProfileProps) => {
  console.log("rofile", params);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select(
  //     `*, builds:builds(*, skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*)))`,
  //   )
  //   .eq("id", params.profileId);

  //   const result: any = data![0];

  let result: any;

  console.log("searchParams", searchParams);

  if (searchParams.class) {
    const { data, error } = await supabase
      .from("builds")
      .select(
        `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
      )
      .eq("user", params.profileId)
      .eq("type", searchParams.class)
      .order("id", { ascending: false })
      .limit(PAGINATION_LIMIT);

    result = { builds: [...data!] };
  } else {
    const { data, error } = await supabase
      .from("builds")
      .select(
        `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
      )
      .eq("user", params.profileId)
      .order("id", { ascending: false })
      .limit(PAGINATION_LIMIT);

    result = { builds: [...data!] };
  }

  const { data: characterData, error: characterError } = await supabase
    .from("characters")
    .select("*");

  // console.log("result", result);

  const result2: any = characterData!;
  const dateString = result.builds[result.builds.length - 1].created_at;
  const dateObject = new Date(dateString);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let likes = null;

  if (user) {
    const { data: likesData, error: likesError } = await supabase
      .from("build_likes")
      .select("*")
      .eq("user", user.id);

    likes = likesData ? likesData.map((like) => like.build) : null;
  }

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
            pathurl={`/profile/${params.profileId}`}
            likes={likes!}
            authedUser={!!user}
            likedFilter={false}
            userId={params.profileId}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
