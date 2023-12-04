import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import BuildTable from "./profile/[profileId]/components/BuildTable";
import BuildTableNav from "@/components/BuildTableNav";
import BuildTableContainer from "@/components/BuildTableContainer";
import { Suspense } from "react";
import { Card, Skeleton } from "@nextui-org/react";
import BuildTableSkeleton from "@/components/BuildTableSkeleton";

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
    .limit(10);

  const result: any = data!;

  const { data: characterData, error: characterError } = await supabase
    .from("characters")
    .select("*");

  const result2: any = characterData!;

  if (characterError || error) {
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

        {/* <Suspense fallback={<BuildTableSkeleton />}>
          <BuildTableContainer />
        </Suspense> */}

        <BuildTable
          builds={result}
          characters={result2}
          pathurl={"/"}
          likes={likes}
          authedUser={!!user}
        />
      </div>
    </main>
  );
}
