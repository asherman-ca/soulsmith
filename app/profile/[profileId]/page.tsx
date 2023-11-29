import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import React from "react";

type ProfileProps = {
  params: {
    profileId: string;
  };
};

const page = async ({ params: { profileId } }: ProfileProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("profiles")
    .select(
      `*, builds:builds(*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*)))`,
    )
    .eq("id", profileId);

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
            {data![0].username || profileId}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default page;
