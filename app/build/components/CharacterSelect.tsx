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

interface CharacterSelectProps {
  characters: Character[];
  setValue: any;
}

const CharacterSelect: FC<CharacterSelectProps> = ({
  characters,
  setValue,
}) => {
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Choose Hero</ModalHeader>
          <ModalBody>
            <div className="grid grid-cols-4 gap-4">
              {characters.map((character: Character) => (
                <div className="group flex cursor-pointer flex-col items-start gap-2 truncate">
                  <h2 className="truncate text-sm font-semibold">
                    {character.name}
                  </h2>
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
                          {character.name}
                        </h1>
                        <h2>{character.tags}</h2>
                      </div>
                    }
                  >
                    <Image
                      onClick={() => {
                        setValue("character", character);
                        onClose();
                      }}
                      src={character.image}
                      className="h-full transition-all group-hover:scale-105"
                      height={100}
                      width={100}
                      alt="character image"
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

export default CharacterSelect;
