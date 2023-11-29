import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

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
      <div className="content-container">beans</div>
    </main>
  );
}
