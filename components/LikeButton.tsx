import { createClient } from "@/utils/supabase/client";
import { cn } from "@nextui-org/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconHeart } from "@tabler/icons-react";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface LikeButtonProps {
  buildId: number;
  setLikes?: (arg: any) => void;
  initialLike?: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({ buildId, initialLike }) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(initialLike || null);
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
      toast.success("Unliked build");
    } else {
      const { error } = await supabase
        .from("build_likes")
        .insert({ build: buildId, user: session.user.id });
      setIsLiked(true);
      toast.success("Liked build");
    }
  };
  // get supabase user on client

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
      <p>42</p>
    </button>
  );
};

export default LikeButton;
