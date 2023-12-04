import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";

import BuildTableNav from "@/components/BuildTableNav";
import BuildTable from "@/components/BuildTable";
import { PAGINATION_LIMIT } from "@/utils/contants";

export const dynamic = "force-dynamic";

export default async function Index({
  searchParams,
}: {
  searchParams: { class: string };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let result: any;
  // TODO: make all build table fetches use this logic
  // TODO: also check for sort=liked param on the profile page
  if (searchParams.class) {
    const { data, error } = await supabase
      .from("builds")
      .select(
        `*, skills:build_skills(skill:skills(*)), likes:build_likes(*), character:characters(*), weapon:weapons(*), profile:profiles(*), like_count:build_likes(count)`,
      )
      .eq("type", searchParams.class)
      .order("id", { ascending: false })
      .limit(PAGINATION_LIMIT * 5);

    result = data!;
  } else {
    const { data, error } = await supabase
      .from("builds")
      .select(
        `*, skills:build_skills(skill:skills(*)), character:characters(*), likes:build_likes(*), weapon:weapons(*), profile:profiles(*), like_count:build_likes(count)`,
      )
      .order("id", { ascending: false })
      .limit(PAGINATION_LIMIT * 5);

    console.log("data", data);

    result = data!;
  }

  result.sort((a: any, b: any) =>
    a.like_count[0].count < b.like_count[0].count ? 1 : -1,
  );

  const { data: characterData, error: characterError } = await supabase
    .from("characters")
    .select("*");

  const result2: any = characterData!;

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
    <main className="page-container">
      <div className="content-container">
        <h3 className="flex items-center text-xs" aria-label="builder header">
          Soulstone Survivors
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            Home
          </span>
        </h3>

        <BuildTableNav />

        <BuildTable
          builds={result}
          characters={result2}
          pathurl={"/liked"}
          likes={likes!}
          authedUser={!!user}
          likedFilter={true}
        />
      </div>
    </main>
  );
}
