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
      className="border-border100 h-16 w-16 cursor-pointer rounded-md border-2"
    >
      {watch(type)[runePosition]?.image && (
        <Image
          onClick={() => handleModalChange(type, runePosition)}
          className="h-full w-full rounded-md"
          src={watch(type)[runePosition]?.image}
          height={100}
          width={100}
          alt="rune image"
        />
      )}
    </div>
  );
};

export default RuneTile;
