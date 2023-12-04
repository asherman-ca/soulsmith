import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import BuildTable from "./[profileId]/components/BuildTable";
import ProfileBuildTableNav from "./components/ProfileBuildTableNav";
import { PAGINATION_LIMIT } from "@/utils/contants";

export const dynamic = "force-dynamic";

type ProfileProps = {
  searchParams: {
    sort: string;
    class: string;
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
    if (searchParams.class) {
      const { data: likedBuilds, error: likedBuildsError } = await supabase
        .from("build_likes")
        .select(
          `*, build:builds(*, like_count:build_likes(count), skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*))`,
        )
        .eq("user", user.id)
        .limit(PAGINATION_LIMIT * 5);

      result = {
        builds: likedBuilds!
          .map((build: any) => build.build)
          .filter((build) => build.type === searchParams.class),
      };
    } else {
      const { data: likedBuilds, error: likedBuildsError } = await supabase
        .from("build_likes")
        .select(
          `*, build:builds(*, like_count:build_likes(count), skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*)))`,
        )
        .eq("user", user.id)
        .limit(PAGINATION_LIMIT * 5);

      result = { builds: likedBuilds!.map((build: any) => build.build) };
    }
  } else {
    if (searchParams.class) {
      const { data, error } = await supabase
        .from("builds")
        .select(
          `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
        )
        .eq("type", searchParams.class)
        .eq("user", user.id)
        .order("id", { ascending: false })
        .limit(PAGINATION_LIMIT);

      result = { builds: [...data!] };
    } else {
      const { data, error } = await supabase
        .from("builds")
        .select(
          `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
        )
        .eq("user", user.id)
        .order("id", { ascending: false })
        .limit(PAGINATION_LIMIT);

      result = { builds: [...data!] };
    }
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
          likedFilter={searchParams.sort === "liked"}
          userId={user.id}
        />
      </div>
    </div>
  );
};

export default page;
