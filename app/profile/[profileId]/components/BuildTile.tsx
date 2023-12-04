import LikeButton from "@/components/LikeButton";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { toast } from "sonner";

interface BuildTileProps {
  build: BuildData;
  isInitiallyLiked?: boolean;
  authedUser: boolean;
  ref?: any;
}

const BuildTile: FC<BuildTileProps> = ({
  build,
  isInitiallyLiked,
  authedUser,
  ref,
}) => {
  const dateString = build.created_at;
  const dateObject = new Date(dateString);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);
  build.skills.sort((a, b) => a.position - b.position);

  const copyToClipboard = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    await navigator.clipboard.writeText(
      `https://soulsmith.vercel.app/build/${build.id}`,
    );
    toast.success("Copied to clipboard");
  };

  return (
    <a className="flex flex-col" href={`/build/${build.id}`} ref={ref}>
      <div className="border-border100 bg-bg100 flex rounded-t-md border-2 p-2">
        {/* <div className="flex rounded-t-md border border-foreground-500 p-2"> */}
        <div className="flex flex-1 gap-2">
          <div>
            <Tooltip
              placement="bottom"
              color="default"
              classNames={{
                base: ["border-2 rounded-md border-border100 w-44"],
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
                className="border-border100 h-16 w-16 flex-1 rounded-md border-2"
                alt="character image"
                height={100}
                width={100}
                src={build.character.image}
              />
            </Tooltip>
          </div>
          <div className="h-full! flex flex-col items-start justify-between">
            <p className="text-lg font-bold">{build.name}</p>
            <p className="rounded-md bg-foreground-200/50 px-2 py-1">
              {build.character.name}
            </p>
          </div>
        </div>
        <div className="flex flex-1 justify-between gap-2">
          <div className="flex items-center">
            <Tooltip
              placement="bottom"
              color="default"
              classNames={{
                base: ["border-2 rounded-md border-border100"],
                content: ["p-2 rounded-md text-xs"],
              }}
              isDisabled={!build.weapon?.name}
              content={
                <div className="flex flex-col gap-1 text-xs">
                  <h1 className="text-base font-medium">
                    {build.weapon?.name}
                  </h1>
                  {build.weapon?.stats &&
                    build.weapon?.stats.split(",").map((weaponStat: string) => {
                      return (
                        <p key={`${build.id} - ${weaponStat}`}>{weaponStat}</p>
                      );
                    })}
                </div>
              }
            >
              {build.weapon?.image ? (
                <Image
                  className="border-border100 h-12 w-12 rounded-md border-2"
                  alt="skill image"
                  height={100}
                  width={100}
                  src={build.weapon?.image}
                />
              ) : (
                <div className="border-border100 h-12 w-12 rounded-md border-2"></div>
              )}
            </Tooltip>
          </div>
          <div className="flex items-center gap-2">
            {build.skills.map(({ skill, position }) => (
              <div
                key={`${build.id} - ${skill.id} - ${position}`}
                className="h-12 w-12"
              >
                <Tooltip
                  placement="bottom"
                  color="default"
                  classNames={{
                    base: ["border-2 rounded-md border-border100 w-60"],
                    content: ["p-2 rounded-md text-xs"],
                  }}
                  content={
                    <div className="flex flex-col gap-1">
                      <div className="flex items-end justify-between font-medium">
                        <h1 className="text-base">{skill.name}</h1>
                        <p>{skill.cooldown}s</p>
                      </div>
                      <p>{skill.description}</p>
                    </div>
                  }
                >
                  <Image
                    className="border-border100 h-12 w-12 rounded-md border-2"
                    alt="skill image"
                    height={100}
                    width={100}
                    src={skill.image}
                  />
                </Tooltip>
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <LikeButton
              buildId={build.id}
              initialLike={isInitiallyLiked}
              initialLikes={build.likes.length}
              type={"buildtile"}
              authedUser={authedUser}
            />
          </div>
        </div>
      </div>
      <div className="bg-bg100 border-border100 flex justify-between rounded-b-md border-2 border-t-0 p-2 text-xs">
        <div>Created on {formattedDate}</div>
        <button className="cursor-pointer" onClick={copyToClipboard}>
          Share
        </button>
      </div>
    </a>
  );
};

export default BuildTile;
