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
import { motion } from "framer-motion";

interface WeaponSelectProps {
  characters: Character[];
  watch: any;
  setValue: any;
}

const WeaponSelect: FC<WeaponSelectProps> = ({
  characters,
  watch,
  setValue,
}) => {
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Choose Weapon</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-4 gap-4">
              {characters
                .filter((char) => char.name === watch("character").name)[0]
                .weapons.map((weapon) => (
                  <div className="group flex cursor-pointer flex-col items-start gap-2 truncate">
                    <h2 className="truncate text-sm font-semibold">
                      {weapon.name}
                    </h2>
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
                            {weapon.name}
                          </h1>
                          {weapon.stats.split(",").map((weaponStat: string) => {
                            return <p key={weaponStat}>{weaponStat}</p>;
                          })}
                        </div>
                      }
                    >
                      <Image
                        onClick={() => {
                          setValue("weapon", weapon);
                          onClose();
                        }}
                        src={weapon.image}
                        className="h-full transition-all group-hover:scale-105"
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

export default WeaponSelect;
