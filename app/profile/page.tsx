import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import BuildTable from "./[profileId]/components/BuildTable";
import ProfileBuildTableNav from "./components/ProfileBuildTableNav";

export const dynamic = "force-dynamic";

type ProfileProps = {
  searchParams: {
    sort: string;
  };
};

const page = async ({ searchParams }: ProfileProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let result: any;

  if (searchParams.sort === "liked") {
    // const { data, error } = await supabase
    //   .from("profiles")
    //   .select(
    //     `*, builds:builds(*, like_count:build_likes(count), skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*)))`,
    //   )
    //   .eq("id", user.id)
    //   .limit(50);

    // result = data![0];
    // result.builds.sort(
    //   (a: any, b: any) => b.like_count[0].count - a.like_count[0].count,
    // );

    const { data: likedBuilds, error: likedBuildsError } = await supabase
      .from("build_likes")
      .select(
        "*, build:builds(*, like_count:build_likes(count), skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*)))",
      )
      .eq("user", user.id);

    result = { builds: likedBuilds!.map((build: any) => build.build) };
  } else {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `*, builds:builds(*, skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*)))`,
      )
      .eq("id", user.id);

    result = data![0];
  }

  const { data: characterData, error: characterError } = await supabase
    .from("characters")
    .select("*");

  const result2: any = characterData!;

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
        </h3>

        <ProfileBuildTableNav />

        <BuildTable
          builds={result.builds}
          characters={result2}
          profileId={user.id}
          pathurl={`/profile${
            searchParams.sort === "liked" ? "?sort=liked" : ""
          }`}
          likes={likes!}
          authedUser={!!user}
        />
      </div>
    </div>
  );
};

export default page;
