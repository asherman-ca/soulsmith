"use client";
import { FC, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";

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
  };
};

const BuildForm: FC<BuildFormProps> = ({ skills, characters }) => {
  const [isCharacterSelectOpen, setIsCharacterSelectOpen] =
    useState<boolean>(false);
  const onCharacterOpenChange = (open: boolean) => {
    setIsCharacterSelectOpen((p) => !p);
  };

  const [isWeaponSelectOpen, setIsWeaponSelectOpen] = useState<boolean>(false);
  const onWeaponOpenChange = (open: boolean) => {
    setIsWeaponSelectOpen((p) => !p);
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
      },
      skills: [],
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex flex-col gap-4 bg-gray-800 p-4 text-sm">
      <div className="flex flex-col gap-2">
        <h2 className="font-semibold">CHARACTER</h2>
        <div
          onClick={() => setIsCharacterSelectOpen(true)}
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
                onClick={() => setIsCharacterSelectOpen(true)}
                className="h-full w-full"
                src={watch("character").image}
                height={100}
                width={100}
                alt=""
              />
            </Tooltip>
          )}
        </div>
        <Modal
          isOpen={isCharacterSelectOpen}
          onOpenChange={onCharacterOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader>Choose Hero</ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-4 gap-4">
                    {characters.map((character: Character) => (
                      <div
                        className="group flex cursor-pointer flex-col items-start gap-2 truncate"
                        onClick={() => {
                          setValue("character", character);
                          onClose();
                        }}
                      >
                        <h2 className="truncate text-sm font-semibold">
                          {character.name}
                        </h2>
                        <Image
                          src={character.image}
                          className="h-full transition-all group-hover:scale-105"
                          height={100}
                          width={100}
                          alt="character image"
                        />
                      </div>
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button variant="ghost" onClick={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      {/* Weapon Select */}
      {watch("character").name && (
        <div className="flex flex-col gap-2">
          <h2 className="font-semibold">WEAPON</h2>
          <div
            className="h-24 w-24 cursor-pointer border"
            onClick={() => setIsWeaponSelectOpen(true)}
          >
            {watch("weapon").image && (
              <Image
                onClick={() => setIsWeaponSelectOpen(true)}
                className="h-full w-full"
                src={watch("weapon").image}
                height={100}
                width={100}
                alt="weapon image"
              />
            )}
          </div>
          <Modal isOpen={isWeaponSelectOpen} onOpenChange={onWeaponOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader>Choose Weapon</ModalHeader>
                  <ModalBody>Beans</ModalBody>
                  <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      )}
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
    </div>
  );
};

export default BuildForm;
