import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import BuildTable from "@/components/BuildTable";
import BuildTableNav from "@/components/BuildTableNav";
import { PAGINATION_LIMIT } from "@/utils/contants";

export const dynamic = "force-dynamic";

export default async function Index({
  searchParams,
}: {
  searchParams: { class: string };
}) {
  console.log("params", searchParams.class);
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  let result: any;
  if (searchParams.class) {
    const { data, error } = await supabase
      .from("builds")
      .select(
        `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
      )
      .eq("type", searchParams.class)
      .order("id", { ascending: false })
      .limit(PAGINATION_LIMIT);

    result = data!;
  } else {
    const { data, error } = await supabase
      .from("builds")
      .select(
        `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
      )
      .order("id", { ascending: false })
      .limit(PAGINATION_LIMIT);

    result = data!;
  }

  const { data: characterData, error: characterError } = await supabase
    .from("characters")
    .select("*");

  const result2: any = characterData!;

  if (characterError) {
    throw new Error("Failed to fetch");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let likes = null;

  if (user) {
    const { data: likesData, error: likesError } = await supabase
      .from("build_likes")
      .select("*")
      .eq("user", user.id);

    if (likesError) throw new Error("Failed to fetch");

    likes = likesData ? likesData.map((like) => like.build) : null;
  }

  // await new Promise((resolve) => setTimeout(resolve, 10000));

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
          pathurl={"/"}
          likes={likes}
          authedUser={!!user}
          likedFilter={false}
        />
      </div>
    </main>
  );
}
