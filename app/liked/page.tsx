import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";

import BuildTableNav from "@/components/BuildTableNav";
import BuildTable from "../profile/[profileId]/components/BuildTable";

export const dynamic = "force-dynamic";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase
    .from("builds")
    .select(
      `*, skills:build_skills(skill:skills(*)), character:characters(*), weapon:weapons(*), profile:profiles(*)`,
    )
    .order("id", { ascending: false })
    .limit(100);

  const result: any = data!;

  const { data: characterData, error: characterError } = await supabase
    .from("characters")
    .select("*");

  const result2: any = characterData!;

  console.log("res", result);

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

        <BuildTable builds={result} characters={result2} pathurl={"/liked"} />
      </div>
    </main>
  );
}
