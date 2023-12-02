"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@nextui-org/react";
import { IconSkull, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { toast } from "sonner";

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
      toast.error("Something went wrong");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="group">
      <Button
        color="warning"
        onClick={handleDelete}
        radius="none"
        className="bg-bg100 relative flex gap-2 rounded-md border font-medium"
        variant="bordered"
      >
        <div className="bg-bg100 ease absolute left-0 top-0 z-10 flex h-full w-full translate-y-0 items-center justify-center gap-2 duration-700 group-hover:translate-y-[100%]">
          DELETE BUILD
          <IconTrash />
        </div>
        NO BACKSIES <IconSkull />
      </Button>
    </div>
  );
};

export default DeleteButton;
