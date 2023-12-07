import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { FC } from "react";

interface RuneTileProps {
  handleModalChange: (type: string, position?: number) => void;
  watch: any;
  runePosition: number;
  type: "versatility" | "tenacity";
}

const RuneTile: FC<RuneTileProps> = ({
  handleModalChange,
  watch,
  runePosition,
  type,
}) => {
  return (
    <div
      onClick={() => handleModalChange(type, runePosition)}
      className="h-16 w-16 cursor-pointer rounded-md border-2 border-border100"
    >
      {watch(type)[runePosition]?.image && (
        <Tooltip
          placement="bottom"
          color="default"
          classNames={{
            base: ["border-2 rounded-md border-border100 bg-bg100"],
            content: ["p-2 rounded-md text-xs"],
          }}
          content={
            <div className="flex flex-col gap-1">
              <h1 className="text-base font-medium">
                {watch(type)[runePosition]?.name}
              </h1>
              <p>{watch(type)[runePosition]?.description}</p>
            </div>
          }
        >
          <Image
            onClick={() => handleModalChange(type, runePosition)}
            className="h-full w-full rounded-md"
            src={watch(type)[runePosition]?.image}
            height={100}
            width={100}
            alt="rune image"
          />
        </Tooltip>
      )}
    </div>
  );
};

export default RuneTile;
