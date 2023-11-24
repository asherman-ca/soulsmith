"use client";
import { FC, useState } from "react";
import { Modal, Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import WeaponSelect from "./WeaponSelect";
import CharacterSelect from "./CharacterSelect";
import { flushSync } from "react-dom";
import SkillSelect from "./SkillSelect";

interface BuildFormProps {
  skills: Skill[];
  characters: Character[];
}

type Inputs = {
  name: string;
  description?: string;
  character: Character;
  skills: Skill[];
  weapon: {
    image: string;
    name: string;
    stats: string;
  };
};

const BuildForm: FC<BuildFormProps> = ({ skills, characters }) => {
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
  } = useForm<Inputs>({
    defaultValues: {
      name: "",
      description: "",
      character: {
        name: "",
        image: "",
        tags: "",
      },
      weapon: {
        image: "",
        name: "",
        stats: "",
      },
      skills: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  // console.log(watch("skills")[1]);

  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-4 text-sm">
      {/* Character and weapon select */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-2">
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
                  <div>
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
            <h2 className="font-semibold">WEAPON</h2>
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
                    <div>
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
          <div
            onClick={() => handleModalChange("skill", 1)}
            className="h-16 w-16 cursor-pointer rounded-md border-4 border-slate-300/30"
          >
            {watch("skills")[1]?.image && (
              <Image
                onClick={() => handleModalChange("skill", 1)}
                className="h-full w-full rounded-md"
                src={watch("skills")[1]?.image}
                height={100}
                width={100}
                alt="weapon image"
              />
            )}
          </div>

          <div
            onClick={() => handleModalChange("skill", 2)}
            className="h-16 w-16 cursor-pointer rounded-md border-4 border-slate-300/30"
          >
            {watch("skills")[2]?.image && (
              <Image
                onClick={() => handleModalChange("skill", 2)}
                className="h-full w-full rounded-md"
                src={watch("skills")[2]?.image}
                height={100}
                width={100}
                alt="weapon image"
              />
            )}
          </div>

          <div
            onClick={() => handleModalChange("skill", 3)}
            className="h-16 w-16 cursor-pointer rounded-md border-4 border-slate-300/30"
          >
            {watch("skills")[3]?.image && (
              <Image
                onClick={() => handleModalChange("skill", 3)}
                className="h-full w-full rounded-md"
                src={watch("skills")[3]?.image}
                height={100}
                width={100}
                alt="weapon image"
              />
            )}
          </div>

          <div
            onClick={() => handleModalChange("skill", 4)}
            className="h-16 w-16 cursor-pointer rounded-md border-4 border-slate-300/30"
          >
            {watch("skills")[4]?.image && (
              <Image
                onClick={() => handleModalChange("skill", 4)}
                className="h-full w-full rounded-md"
                src={watch("skills")[4]?.image}
                height={100}
                width={100}
                alt="weapon image"
              />
            )}
          </div>
        </div>
      </div>
      {/* Rune Select */}
      <div>Runes</div>
      <Button onClick={handleSubmit(onSubmit)}>Create</Button>
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
  );
};

export default BuildForm;
