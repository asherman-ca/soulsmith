"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface DeleteButtonProps {
  buildId: string;
}

const DeleteButton: FC<DeleteButtonProps> = ({ buildId }) => {
  const supabase = createClient();
  const router = useRouter();

  const handleDelete = async () => {
    const { error } = await supabase.from("builds").delete().eq("id", buildId);
    if (error) {
      console.error(error);
    }
    router.refresh();
    router.push("/");
  };

  return (
    <Button
      color="danger"
      onClick={handleDelete}
      radius="none"
      className="rounded-md"
    >
      DELETE BUILD
    </Button>
  );
};

export default DeleteButton;
