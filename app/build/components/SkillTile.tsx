import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";

interface SkillTileProps {
  handleModalChange: (type: string, position?: number) => void;
  skillPosition: number;
  watch: any;
}

const SkillTile: FC<SkillTileProps> = ({
  handleModalChange,
  skillPosition,
  watch,
}) => {
  return (
    <div
      onClick={() => handleModalChange("skill", skillPosition)}
      className="border-border100 h-16 w-16 cursor-pointer rounded-md border-2"
    >
      {watch("skills")[skillPosition]?.image && (
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
                <h1 className="text-base">
                  {watch("skills")[skillPosition]?.name}
                </h1>
                <p>{watch("skills")[skillPosition]?.cooldown}s</p>
              </div>
              <p>{watch("skills")[skillPosition]?.description}</p>
            </div>
          }
        >
          <Image
            onClick={() => handleModalChange("skill", skillPosition)}
            className="h-full w-full rounded-md"
            src={watch("skills")[skillPosition]?.image}
            height={100}
            width={100}
            alt="weapon image"
          />
        </Tooltip>
      )}
    </div>
  );
};

export default SkillTile;
