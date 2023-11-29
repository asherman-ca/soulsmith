import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data, error } = await supabase
    .from("builds")
    .select(
      `*,
      build_skills (
        *
      ),
      characters:characters(*),
      weapon:weapons(*)`,
    )
    .order("id", { ascending: false });

  console.log("builds", data);

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
      </div>
    </main>
  );
}
