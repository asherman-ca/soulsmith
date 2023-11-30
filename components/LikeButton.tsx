import { cn } from "@nextui-org/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconHeart } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface LikeButtonProps {
  buildId: number;
  setLikes?: (arg: any) => void;
  initialLike?: boolean;
  initialLikes: number;
}

const LikeButton: FC<LikeButtonProps> = ({
  buildId,
  initialLike,
  initialLikes,
}) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(initialLike || null);
  const [likes, setLikes] = useState<number>(initialLikes);
  useEffect(() => {
    initialLike && setIsLiked(initialLike);
  }, [initialLike]);

  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const handleLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("sesh", session);
    if (!session) return;

    if (isLiked) {
      const { error } = await supabase
        .from("build_likes")
        .delete()
        .eq("build", buildId)
        .eq("user", session.user.id);
      setIsLiked(false);
      setLikes(likes - 1);
      toast.success("Unliked build");
    } else {
      const { error } = await supabase
        .from("build_likes")
        .insert({ build: buildId, user: session.user.id });
      setIsLiked(true);
      setLikes(likes + 1);
      toast.success("Liked build");
    }
  };

  return (
    <button
      className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 hover:bg-gray-900/50"
      onClick={handleLike}
    >
      <IconHeart
        className={cn("h-5 w-5", {
          "text-red-500": isLiked,
        })}
      />
      <p>{likes}</p>
    </button>
  );
};

export default LikeButton;
