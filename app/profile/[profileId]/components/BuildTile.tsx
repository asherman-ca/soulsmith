import { Tooltip } from "@nextui-org/react";
import { IconHeart } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BuildTileProps {
  build: BuildData;
}

const BuildTile: FC<BuildTileProps> = ({ build }) => {
  const dateString = build.created_at;
  const dateObject = new Date(dateString);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  build.skills.sort((a, b) => a.position - b.position);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log("like");
  };

  return (
    <div className="flex flex-col">
      <Link
        href={`/build/${build.id}`}
        className="flex rounded-t-xl bg-[#3F3F45] p-2"
      >
        <div className="flex flex-1 gap-2">
          <div>
            <Tooltip
              placement="bottom"
              color="default"
              classNames={{
                base: ["border-2 rounded-md border-gray-500 w-44"],
                content: ["p-2 rounded-md text-xs"],
              }}
              content={
                <div className="flex flex-col gap-1">
                  <h1 className="text-base font-medium">
                    {build.character.name}
                  </h1>
                  <h2>{build.character.tags}</h2>
                </div>
              }
            >
              <Image
                className="h-16 w-16 flex-1 rounded-xl border-4 border-slate-300/30"
                alt="character image"
                height={100}
                width={100}
                src={build.character.image}
              />
            </Tooltip>
          </div>
          <div className="h-full! flex flex-col items-start justify-between">
            <p className="text-lg font-bold">{build.name}</p>
            <p className="rounded-xl bg-gray-900 px-2 py-1">
              {build.character.name}
            </p>
          </div>
        </div>
        <div className="flex flex-1 justify-between gap-2">
          <div>
            <Image
              className="h-16 w-16 rounded-xl border-4 border-slate-300/30"
              alt="skill image"
              height={100}
              width={100}
              src={build.weapon.image}
            />
          </div>
          <div className="flex gap-2">
            {build.skills.map(({ skill, position }) => (
              <div
                key={`${build.id} - ${skill.id} - ${position}`}
                className="h-16 w-16"
              >
                <Image
                  className="h-16 w-16 rounded-xl border-4 border-slate-300/30"
                  alt="skill image"
                  height={100}
                  width={100}
                  src={skill.image}
                />
              </div>
            ))}
          </div>
          <button
            className="flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 hover:bg-red-600"
            onClick={handleClick}
          >
            <IconHeart className="h-5 w-5" />
            <p>42</p>
          </button>
        </div>
      </Link>
      <div className="flex justify-between rounded-b-xl bg-[#3F3F45]/75 p-2 text-xs">
        <div>Created on {formattedDate}</div>
        <div>share button</div>
      </div>
    </div>
  );
};

export default BuildTile;
