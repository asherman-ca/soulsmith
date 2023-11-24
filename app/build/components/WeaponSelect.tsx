import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";

interface WeaponSelectProps {
  characters: Character[];
  watch: any;
}

const WeaponSelect: FC<WeaponSelectProps> = ({ characters, watch }) => {
  return (
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader>Choose Weapon</ModalHeader>
          <ModalBody>
            {characters
              .filter((char) => char.name === watch("character").name)[0]
              .weapons.map((weapon) => (
                <div>{weapon.name}</div>
              ))}
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
