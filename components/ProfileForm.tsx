"use client";
import { createClient } from "@/utils/supabase/client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  cn,
} from "@nextui-org/react";
import { IconSettings } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface ProfileFormProps {
  userId: string;
  initialUsername: string | null;
}

type Input = {
  username: string;
};

const ProfileForm: FC<ProfileFormProps> = ({ userId, initialUsername }) => {
  console.log(initialUsername);
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<Input>();

  const onSubmit = async (data: Input, onClose: () => void) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ username: data.username })
      .eq("id", userId);
    if (error) {
      console.log(error);
      toast.error(error?.message);
    } else {
      onClose();
      toast.success("Username updated");
      router.refresh();
    }
  };

  return (
    <>
      <Button onPress={onOpen} isIconOnly variant="faded" radius="md">
        <IconSettings
          className={cn("", {
            "animate-wiggleinfinite text-orange-500": initialUsername === null,
          })}
        />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Update Username</ModalHeader>
              <ModalBody>
                <Input
                  label={initialUsername || "Please update username 🙏 😊"}
                  {...register("username", { required: true })}
                  errorMessage={errors.username && "Username is required"}
                />
                <Button
                  variant="bordered"
                  onClick={handleSubmit((data) => onSubmit(data, onClose))}
                >
                  Submit
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileForm;
