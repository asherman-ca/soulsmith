import { FC, useState } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
  Input,
} from "@nextui-org/react";
import Image from "next/image";
import { IconSearch } from "@tabler/icons-react";

interface SkillSelectProps {
  skills: Skill[];
  setValue: any;
  watch: any;
  activePosition: number;
}

const SkillSelect: FC<SkillSelectProps> = ({
  skills,
  setValue,
  activePosition,
  watch,
}) => {
  const [filter, setFilter] = useState<string>("");
  const displaySkills = !filter
    ? skills.sort((a, b) => a.name.localeCompare(b.name))
    : skills
        .filter((skill) => {
          return (
            skill.name.toLowerCase().includes(filter.toLowerCase()) ||
            skill.tags.toLowerCase().includes(filter.toLowerCase())
          );
        })
        .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="grayborder border-b">
            Skill Selection
          </ModalHeader>
          <ModalHeader className="grayborder border-b">
            <Input
              startContent={<IconSearch />}
              placeholder="Tag or Name..."
              onChange={(event) => setFilter(event.target.value)}
            />
          </ModalHeader>
          <ModalBody className="max-h-[400px] overflow-auto">
            <div className="grid grid-cols-5 gap-4 pt-2">
              {displaySkills.map((skill) => (
                <div
                  className="group flex cursor-pointer flex-col items-start gap-2 truncate"
                  key={skill.id}
                >
                  <Tooltip
                    placement="bottom"
                    color="default"
                    classNames={{
                      base: ["border-2 rounded-md border-gray-500 w-60"],
                      content: ["p-2 rounded-md text-xs"],
                    }}
                    content={
                      <div className="flex flex-col gap-1">
                        <div className="flex items-end justify-between font-medium">
                          <h1 className="text-base">{skill.name}</h1>
                          <p>{skill.cooldown}s</p>
                        </div>
                        <p>{skill.description}</p>
                      </div>
                    }
                  >
                    <Image
                      onClick={() => {
                        onClose();
                        setValue("skills", {
                          ...watch("skills"),
                          [activePosition]: skill,
                        });
                      }}
                      src={skill.image}
                      className="h-full rounded-xl border-4 border-slate-300/30 transition-all duration-75 group-hover:scale-95 group-hover:border-slate-300/70"
                      height={100}
                      width={100}
                      alt="weapon image"
                    />
                  </Tooltip>
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
  );
};

export default SkillSelect;
