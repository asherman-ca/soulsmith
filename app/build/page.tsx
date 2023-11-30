import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import React from "react";
import BuildForm from "./components/BuildForm";
import { redirect } from "next/navigation";

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

  const skills = await supabase.from("skills").select("*");
  const skillData: Skill[] = skills.data!;

  const { data, error } = await supabase.from("characters").select(`
      *,
      weapons (
        *
      )
    `);
  const characterData: Character[] = data!;

  return (
    <main className="page-container">
      <div className="content-container">
        <h3 className="flex items-center text-xs" aria-label="builder header">
          Soulstone Survivors
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            Build Planner
          </span>
        </h3>
        <BuildForm skills={skillData} characters={characterData} />
      </div>
    </main>
  );
};

export default page;
