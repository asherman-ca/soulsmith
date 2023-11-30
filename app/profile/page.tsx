import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import BuildTable from "./[profileId]/components/BuildTable";

export const dynamic = "force-dynamic";

const page = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `*, builds:builds(*, skills:build_skills(position, skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*)))`,
    )
    .eq("id", user.id);

  const result: any = data![0];

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

        <BuildTable
          builds={result.builds}
          characters={result2}
          profileId={user.id}
          pathurl={"/profile"}
          likes={likes!}
        />
      </div>
    </div>
  );
};

export default page;
