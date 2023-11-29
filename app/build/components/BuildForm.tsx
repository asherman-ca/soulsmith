"use client";
import { FC, useState } from "react";
import { Modal, Button, Tooltip, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import WeaponSelect from "./WeaponSelect";
import CharacterSelect from "./CharacterSelect";
import { flushSync } from "react-dom";
import SkillSelect from "./SkillSelect";
import SkillTile from "./SkillTile";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface BuildFormProps {
  skills: Skill[];
  characters: Character[];
}

type Inputs = {
  name: string;
  description?: string;
  character: Character;
  skills: { [key: number]: Skill };
  weapon: {
    image: string;
    name: string;
    stats: string;
    id: number | null;
  };
};

const BuildForm: FC<BuildFormProps> = ({ skills, characters }) => {
  const router = useRouter();
  const supabase = createClient();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>("character");
  const [activePosition, setActivePosition] = useState<number>(1);
  const onModalOpenChange = (open: boolean) => {
    setIsModalOpen((p) => !p);
  };
  const handleModalChange = (type: string, position?: number) => {
    setModalType(type);
    if (type === "skill" && position) {
      setActivePosition(position);
    }
    flushSync(() => {
      setIsModalOpen(true);
    });
  };

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    register,
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: "",
      character: {
        name: "",
        image: "",
        tags: "",
        id: null,
      },
      weapon: {
        image: "",
        name: "",
        stats: "",
        id: null,
      },
      skills: { 1: {}, 2: {}, 3: {}, 4: {}, 5: {}, 6: {} },
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    const { data, error } = await supabase
      .from("builds")
      .insert([
        {
          name: formData.name,
          description: formData.description,
          type: formData.character.name,
          weapon: formData.weapon.id,
          character: formData.character.id,
        },
      ])
      .select();

    if (error) return;

    const { data: skillResponse, error: skillError } = await supabase
      .from("build_skills")
      .insert([
        {
          build: data[0].id,
          skill: formData.skills[1].id,
        },
      ]);
    // console.log(data);

    // toast.success("Build created!");

    router.push(`/build/${data[0].id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-md bg-gray-800 p-4 text-sm">
        {/* Character and weapon select */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">CHARACTER</h2>
            <div
              onClick={() => handleModalChange("character")}
              className="h-24 w-24 cursor-pointer rounded-md border-4 border-slate-300/30"
            >
              {watch("character").image && (
                <Tooltip
                  placement="bottom"
                  color="default"
                  classNames={{
                    base: ["border-2 rounded-md border-gray-500 w-44"],
                    content: ["p-2 rounded-md text-xs"],
                  }}
                  content={
                    <div className="flex flex-col gap-1">
                      <h1 className="text-base font-medium">
                        {watch("character").name}
                      </h1>
                      <h2>{watch("character").tags}</h2>
                    </div>
                  }
                >
                  <Image
                    onClick={() => handleModalChange("character")}
                    className="h-full w-full rounded-md"
                    src={watch("character").image}
                    height={100}
                    width={100}
                    alt=""
                  />
                </Tooltip>
              )}
            </div>
          </div>
          {watch("character").name && (
            <div className="flex flex-col gap-2">
              {/* <h2 className="font-semibold">WEAPON</h2> */}
              <div
                className="h-16 w-16 cursor-pointer rounded-md border-4 border-slate-300/30"
                onClick={() => handleModalChange("weapon")}
              >
                {watch("weapon").image && (
                  <Tooltip
                    placement="bottom"
                    color="default"
                    classNames={{
                      base: ["border-2 rounded-md border-gray-500"],
                      content: ["p-2 rounded-md text-xs"],
                    }}
                    content={
                      <div className="flex flex-col gap-1">
                        <h1 className="text-base font-medium">
                          {watch("weapon").name}
                        </h1>
                        {watch("weapon")
                          .stats?.split(",")
                          .map((weaponStat: string) => {
                            return <p key={weaponStat}>{weaponStat}</p>;
                          })}
                      </div>
                    }
                  >
                    <Image
                      onClick={() => handleModalChange("weapon")}
                      className="h-full w-full rounded-md"
                      src={watch("weapon").image}
                      height={100}
                      width={100}
                      alt="weapon image"
                    />
                  </Tooltip>
                )}
              </div>
            </div>
          )}
        </div>
        {/* Skill Select */}
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">SKILLS</h2>
          <div className="flex gap-4">
            {Object.keys(watch("skills")).map((skillPosition) => {
              return (
                <SkillTile
                  key={skillPosition}
                  handleModalChange={handleModalChange}
                  watch={watch}
                  skillPosition={parseInt(skillPosition)}
                />
              );
            })}
          </div>
        </div>
        {/* Rune Select */}
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">RUNES</h2>
          {/* <div className="flex gap-4"></div> */}
        </div>

        <Modal isOpen={isModalOpen} onOpenChange={onModalOpenChange}>
          {modalType === "character" && (
            <CharacterSelect characters={characters} setValue={setValue} />
          )}
          {modalType === "weapon" && (
            <WeaponSelect
              characters={characters}
              watch={watch}
              setValue={setValue}
            />
          )}
          {modalType === "skill" && (
            <SkillSelect
              watch={watch}
              skills={skills}
              setValue={setValue}
              activePosition={activePosition}
            />
          )}
        </Modal>
      </div>
      <div className="flex flex-col gap-4 rounded-md bg-gray-800 p-4 text-sm">
        <h2 className="font-bold">BUILD DETAILS</h2>
        <Input
          label="Build Name"
          {...register("name", { required: "Build name is required" })}
          errorMessage={errors.name?.message}
        />
        <Textarea
          label="Description"
          // onChange={(e) => setValue("description", e.target.value)}
          {...register("description")}
        />
        {/* <p className="whitespace-pre-line">{watch("description")}</p> */}
        <Button onClick={handleSubmit(onSubmit)}>Create</Button>
      </div>
    </div>
  );
};

export default BuildForm;
