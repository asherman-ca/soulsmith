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
import RuneSelect from "./RuneSelect";
import RuneTile from "./RuneTile";

interface BuildFormProps {
  skills: Skill[];
  characters: Character[];
  runes: Rune[];
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
  versatility: { [key: number]: Rune };
  tenacity: { [key: number]: Rune };
};

const BuildForm: FC<BuildFormProps> = ({ skills, characters, runes }) => {
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
    if (position) {
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
      versatility: { 1: {}, 2: {}, 3: {} },
      tenacity: { 1: {}, 2: {}, 3: {}, 4: {} },
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

    if (error) {
      toast.error("Something went wrong");
      return;
    }

    const skillPayload = Object.keys(formData.skills)
      .filter((key: any) => {
        return formData.skills[key].id !== undefined;
      })
      .map((key: any) => ({
        build: data[0].id,
        skill: formData.skills[key].id,
        position: Number(key),
      }));

    if (skillPayload.length > 0) {
      const { data: skillResponse, error: skillError } = await supabase
        .from("build_skills")
        .insert([...skillPayload]);
    }

    const versaPayload = Object.keys(formData.versatility)
      .filter((key: any) => {
        return formData.versatility[key].id !== undefined;
      })
      .map((key: any) => ({
        build_id: data[0].id,
        rune_id: formData.versatility[key].id,
        position: Number(key),
        type: "versatility",
      }));

    const tenaPayload = Object.keys(formData.tenacity)
      .filter((key: any) => {
        return formData.tenacity[key].id !== undefined;
      })
      .map((key: any) => ({
        build_id: data[0].id,
        rune_id: formData.tenacity[key].id,
        position: Number(key),
        type: "tenacity",
      }));

    const runePayload = [...versaPayload, ...tenaPayload];

    console.log("payload", runePayload);

    if (runePayload.length > 0) {
      const { data: runeResponse, error: runeError } = await supabase
        .from("build_runes")
        .insert([...runePayload]);

      console.log("res", runeResponse);
      console.log("err", runeError);
    }

    router.push(`/build/${data[0].id}`);
    router.refresh();
  };

  const versaRunes = runes.filter((rune) => rune.type === "versatility");
  const tenaRunes = runes.filter((rune) => rune.type === "tenacity");
  const uncommonRunes = tenaRunes.filter((rune) => rune.rarity === "uncommon");
  const rareRunes = tenaRunes.filter((rune) => rune.rarity === "rare");
  const epicRunes = tenaRunes.filter((rune) => rune.rarity === "epic");
  const legoRunes = tenaRunes.filter((rune) => rune.rarity === "legendary");
  const sortedTenaRunes = [
    ...uncommonRunes,
    ...rareRunes,
    ...epicRunes,
    ...legoRunes,
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-md border-2 border-border100 bg-bg100 p-4 text-sm">
        {/* Character and weapon select */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold">CHARACTER</h2>
            <div
              onClick={() => handleModalChange("character")}
              className="h-24 w-24 cursor-pointer rounded-md border-2 border-border100"
            >
              {watch("character").image && (
                <Tooltip
                  placement="bottom"
                  color="default"
                  classNames={{
                    base: ["border-2 rounded-md border-border100 w-44"],
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
              <div
                className="h-16 w-16 cursor-pointer rounded-md border-2 border-border100"
                onClick={() => handleModalChange("weapon")}
              >
                {watch("weapon").image && (
                  <Tooltip
                    placement="bottom"
                    color="default"
                    classNames={{
                      base: ["border-2 rounded-md border-border100"],
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
          <h2 className="font-bold">VERSATILITY</h2>
          <div className="flex gap-4">
            {Object.keys(watch("versatility")).map((runePosition) => {
              return (
                <RuneTile
                  key={runePosition}
                  handleModalChange={handleModalChange}
                  watch={watch}
                  runePosition={parseInt(runePosition)}
                  type={"versatility"}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">TENACITY</h2>
          <div className="flex gap-4">
            {Object.keys(watch("tenacity")).map((runePosition) => {
              return (
                <RuneTile
                  key={`${runePosition} - tenacity`}
                  handleModalChange={handleModalChange}
                  watch={watch}
                  runePosition={parseInt(runePosition)}
                  type={"tenacity"}
                />
              );
            })}
          </div>
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
          {modalType === "versatility" && (
            <RuneSelect
              watch={watch}
              runes={versaRunes}
              setValue={setValue}
              activePosition={activePosition}
            />
          )}
          {modalType === "tenacity" && (
            <RuneSelect
              watch={watch}
              runes={sortedTenaRunes}
              setValue={setValue}
              activePosition={activePosition}
            />
          )}
        </Modal>
      </div>
      {/* Build Details */}
      <div className="flex flex-col gap-4 rounded-md border-2 border-border100 bg-bg100 p-4 text-sm">
        <h2 className="font-bold">BUILD DETAILS</h2>
        <Input
          classNames={{ inputWrapper: ["border-border100"] }}
          label="Build Name"
          {...register("name", { required: "Build name is required" })}
          errorMessage={errors.name?.message}
          variant={"bordered"}
        />
        <Textarea
          classNames={{ inputWrapper: ["border-border100"] }}
          label="Description"
          {...register("description")}
          variant={"bordered"}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="bordered"
          className="border-border100"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default BuildForm;
