"use client";
import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";

interface BuildFormProps {
  skills: Skill[];
  characters: Character[];
}

const BuildForm: FC<BuildFormProps> = ({ skills, characters }) => {
  return (
    <div className="bg-gray-800 p-4">
      <div>Character</div>
      <div>Weapon</div>
      <div>Skills</div>
      <div>Runes</div>
      {/* {skills.map((skill: Skill) => (
        <div>
          <h1>{skill.name}</h1>
          <p>{skill.description}</p>
          <img src={skill.image} alt="" />
        </div>
      ))} */}
    </div>
  );
};

export default BuildForm;
