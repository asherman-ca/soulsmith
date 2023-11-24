"use client";
import { FC, useState } from "react";
import { Modal, Button, Tooltip } from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import WeaponSelect from "./WeaponSelect";
import CharacterSelect from "./CharacterSelect";
import { flushSync } from "react-dom";

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
  const onModalOpenChange = (open: boolean) => {
    setIsModalOpen((p) => !p);
  };
  const handleModalChange = (type: string) => {
    setModalType(type);
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

  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-4 text-sm">
      {/* Character and weapon select */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">CHARACTER</h2>
          <div
            onClick={() => handleModalChange("character")}
            className="h-24 w-24 cursor-pointer border"
          >
            {watch("character").image && (
              <Tooltip
                placement="bottom"
                color="default"
                classNames={{
                  base: ["border-2 rounded-md border-gray-500 w-44"],
                  content: ["p-2 rounded-md"],
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
                  className="h-full w-full"
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
              className="h-24 w-24 cursor-pointer border"
              onClick={() => handleModalChange("weapon")}
            >
              {watch("weapon").image && (
                <Tooltip
                  placement="bottom"
                  color="default"
                  classNames={{
                    base: ["border-2 rounded-md border-gray-500"],
                    content: ["p-2 rounded-md"],
                  }}
                  content={
                    <div>
                      <h1 className="text-base font-medium">
                        {watch("weapon").name}
                      </h1>
                      {watch("weapon")
                        .stats.split(",")
                        .map((weaponStat: string) => {
                          return <p key={weaponStat}>{weaponStat}</p>;
                        })}
                    </div>
                  }
                >
                  <Image
                    onClick={() => handleModalChange("weapon")}
                    className="h-full w-full"
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
      <div>Skills</div>
      {/* Rune Select */}
      <div>Runes</div>
      {/* {skills.map((skill: Skill) => (
        <div>
          <h1>{skill.name}</h1>
          <p>{skill.description}</p>
          <img src={skill.image} alt="" />
        </div>
      ))} */}
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
      </Modal>
    </div>
  );
};

export default BuildForm;
