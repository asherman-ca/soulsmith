import { createClient } from "@/utils/supabase/server";
import { IconChevronRight } from "@tabler/icons-react";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";

type BuildProps = {
  params: {
    buildId: string;
  };
};

const page = async ({ params: { buildId } }: BuildProps) => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: buildData, error: buildFetchError } = await supabase
    .from("builds")
    .select(
      `*,
      skills:build_skills(skill:skills(*)),
      character:characters(*),
      weapon:weapons(*)`,
    )
    .eq("id", buildId);

  const result: BuildData = buildData![0];

  if (!result) {
    return <div className="page-container">Build not found</div>;
  }

  return (
    <div className="page-container">
      <div className="content-container">
        <h3 className="flex items-center text-xs" aria-label="builder header">
          Soulstone Survivors
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            Builds
          </span>
          <span className="flex items-center text-gray-300">
            <IconChevronRight height={16} width={16} />
            {result.name}
          </span>
        </h3>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 rounded-md bg-gray-800 p-4 text-sm">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-4">
                <h2 className="font-bold">Character</h2>
                <div className="h-24 w-24 rounded-md border-4 border-slate-300/30">
                  <Image
                    className="rounded-md"
                    src={result.character.image}
                    alt="character image"
                    height={100}
                    width={100}
                  />
                </div>
              </div>
              {result.weapon?.image && (
                <div className="h-16 w-16 rounded-md border-4 border-slate-300/30">
                  <Image
                    className="rounded-md"
                    src={result.weapon.image}
                    alt="weapon image"
                    height={100}
                    width={100}
                  />
                </div>
              )}
            </div>

            {result.skills.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="font-bold">SKILLS</h2>
                <div className="flex gap-4">
                  {result.skills.map(({ skill }) => (
                    <div
                      key={skill.id}
                      className="h-16 w-16 rounded-md border-4 border-slate-300/30"
                    >
                      <Image
                        className="rounded-md"
                        src={skill.image}
                        alt="skill image"
                        height={100}
                        width={100}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Test */}
      </div>
    </div>
  );
};

export default page;
