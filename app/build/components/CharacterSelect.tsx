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
                <div
                  className="group flex cursor-pointer flex-col items-start gap-2 truncate"
                  key={character.id}
                >
                  <Tooltip
                    placement="bottom"
                    color="default"
                    classNames={{
                      base: ["border-2 rounded-md border-border100 w-44"],
                      content: ["p-2 rounded-md text-xs"],
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
                        setValue("weapon", {});
                        onClose();
                      }}
                      src={character.image}
                      className="h-full rounded-xl border-2 border-border100 transition-all duration-75 group-hover:scale-95 group-hover:border-slate-300/70"
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
