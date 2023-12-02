import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import BuildTableNav from "@/components/BuildTableNav";
import BuildTable from "@/app/profile/[profileId]/components/BuildTable";

const BuildTableContainer = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("builds")
    .select(
      `*, skills:build_skills(position, skill:skills(*)), character:characters(*), weapon:weapons(*), likes:build_likes(*), profile:profiles(*)`,
    )
    .order("id", { ascending: false })
    .limit(50);

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

  return (
    <BuildTable
      builds={result}
      characters={result2}
      pathurl={"/"}
      likes={likes}
      authedUser={!!user}
    />
  );
};

export default BuildTableContainer;
