import { FC } from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";
import Image from "next/image";

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
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Choose Skill</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-4 gap-4">
              {skills.map((skill) => (
                <div className="group flex cursor-pointer flex-col items-start gap-2 truncate">
                  <Tooltip
                    placement="bottom"
                    color="default"
                    classNames={{
                      base: ["border-2 rounded-md border-gray-500 w-60"],
                      content: ["p-2 rounded-md text-xs"],
                    }}
                    content={
                      <div className="flex flex-col gap-1">
                        <div className="flex items-start justify-between">
                          <h1 className="text-base font-medium">
                            {skill.name}
                          </h1>
                          <p>{skill.cooldown}</p>
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
