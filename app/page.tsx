import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import BuildTable from "./profile/[profileId]/components/BuildTable";
import BuildTableNav from "@/components/BuildTableNav";

export const dynamic = "force-dynamic";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("builds")
    .select(
      `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
    )
    .order("id", { ascending: false })
    .limit(100);

  const result: any = data!;

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

  // console.log("res", result);

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
          likes={likes!}
        />
      </div>
    </main>
  );
}
