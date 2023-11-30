import { cn } from "@nextui-org/react";
import { IconHeart } from "@tabler/icons-react";
import { FC } from "react";

interface LikeButtonProps {
  buildId: number;
  setLikes?: (arg: any) => void;
  initialLike?: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ buildId, initialLike }) => {
  return (
    <button
      className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 hover:bg-gray-900/50"
      onClick={() => {}}
    >
      <IconHeart
        className={cn("h-5 w-5", {
          "text-red-500": initialLike,
        })}
      />
      <p>42</p>
    </button>
  );
};

export default LikeButton;
