import Image from "next/image";
import { FC } from "react";

interface BuildTileProps {
  build: BuildData;
}

const BuildTile: FC<BuildTileProps> = ({ build }) => {
  const dateString = build.created_at;
  const dateObject = new Date(dateString);
  const options: any = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = dateObject.toLocaleDateString("en-US", options);

  return (
    <div className="flex flex-col rounded-xl bg-[#3F3F45] p-4">
      <div className="flex ">
        <div className="flex basis-[50%] items-center gap-2">
          <div>
            <Image
              className="h-16 w-16 flex-1 rounded-xl border-4 border-slate-300/30"
              alt="character image"
              height={100}
              width={100}
              src={build.character.image}
            />
          </div>
          <div>
            <p>{build.name}</p>
          </div>
        </div>
        <div className="basis-[50%]">skills right</div>
      </div>
      <div className="flex justify-between text-xs">
        <div>Created on {formattedDate}</div>
        <div>share button</div>
      </div>
    </div>
  );
};

export default BuildTile;
