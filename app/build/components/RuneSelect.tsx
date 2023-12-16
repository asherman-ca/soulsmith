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

interface RuneSelectProps {
  runes: Rune[];
  watch: any;
  setValue: any;
  activePosition: number;
}

const RuneSelect: FC<RuneSelectProps> = ({
  runes,
  watch,
  setValue,
  activePosition,
}) => {
  const [filter, setFilter] = useState<string>("");
  const displayRunes = runes.filter((rune) => {
    return rune.name.toLowerCase().includes(filter.toLowerCase());
  });
  // .sort((a: Rune, b: Rune) => a.name.localeCompare(b.name));

  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Rune Select</ModalHeader>
          <ModalHeader>
            <Input
              startContent={<IconSearch />}
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              // label="Search by name"
            />
          </ModalHeader>
          <ModalBody className="max-h-[400px] overflow-auto">
            <div className="grid grid-cols-5 gap-4 pt-2">
              {displayRunes.map((rune) => (
                <div key={rune.id} className="group cursor-pointer">
                  <Tooltip
                    placement="bottom"
                    color="default"
                    classNames={{
                      base: [
                        "border-2 rounded-md border-border100 bg-bg100 w-60",
                      ],
                      content: ["p-2 rounded-md text-xs"],
                    }}
                    content={
                      <div className="flex flex-col gap-1">
                        <h1 className="text-base font-medium">{rune.name}</h1>
                        <p>{rune.description}</p>
                      </div>
                    }
                  >
                    <Image
                      onClick={() => {
                        onClose();
                        setValue(`${rune.type}`, {
                          ...watch(`${rune.type}`),
                          [activePosition]: rune,
                        });
                      }}
                      src={rune.image}
                      height={100}
                      width={100}
                      alt="rune image"
                      priority
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

export default RuneSelect;
