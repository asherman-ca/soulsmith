"use client";
import { cn } from "@nextui-org/react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconHeart } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { toast } from "sonner";

interface LikeButtonProps {
  buildId: number | string;
  setLikes?: (arg: any) => void;
  initialLike?: boolean;
  initialLikes: number;
  type: string;
  authedUser: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({
  buildId,
  initialLike,
  initialLikes,
  type,
  authedUser,
}) => {
  const [isLiked, setIsLiked] = useState<boolean | null>(initialLike || null);
  const [likes, setLikes] = useState<number>(initialLikes);
  const router = useRouter();
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

  if (type === "buildid") {
    return (
      <button
        className="group flex items-center gap-2"
        onClick={handleLike}
        disabled={!authedUser}
      >
        <IconHeart
          className={cn("h-5 w-5", {
            "group-hover:animate-wiggleinfinite": authedUser,
            "text-red-500": isLiked,
            "group-hover:text-red-500": !isLiked && authedUser,
          })}
        />
        <p>{likes}</p>
      </button>
    );
  }

  return (
    <button
      className="group flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 hover:bg-gray-900/50"
      onClick={handleLike}
      disabled={!authedUser}
    >
      <IconHeart
        className={cn("h-5 w-5", {
          "group-hover:animate-wiggleinfinite": authedUser,
          "text-red-500": isLiked,
          "group-hover:text-red-500": !isLiked && authedUser,
        })}
      />
      <p>{likes}</p>
    </button>
  );
};

export default LikeButton;
