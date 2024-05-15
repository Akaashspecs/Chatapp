import { TbMessageCircle2Filled } from "react-icons/tb";
import { FaShareAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { Character } from "../Provider/CharacterProvider";
import { useContext } from "react";
import { FormContext } from "../App";

const CharacterDetail = ({
  character,
  chatWithCharacter,
}: {
  character: Character;
  chatWithCharacter: number;
}) => {
  const { setEditFormVisibility } = useContext(FormContext);
  const characterInfo = [
    {
      header: "Personality",
      info: character.personality,
    },
    {
      header: "Work",
      info: character.work,
    },
    {
      header: "Hobbies",
      info: character.hobbies,
    },
    {
      header: "Relationship",
      info: character.relationship,
    },
  ];
  return (
    <div className="px-3 2xl:px-7 my-3 w-[300px]  2xl:w-[450px] ">
      <div className="bg-headerGrey rounded-lg h-9 px-4 flex justify-between items-center text-fadeWhite">
        <div className="flex items-center text-sm font-semibold ">
          {" "}
          <div className="cursor-pointer gap-1 flex items-center hover:bg-lightGrey px-1 rounded-md">
            <TbMessageCircle2Filled /> {chatWithCharacter}
          </div>
        </div>
        <div className="text-sm flex items-center gap-1 cursor-pointer">
          <FaLock className="text-xs text-mediumGrey" /> Make Character Public{" "}
          <FaShareAlt className="text-xs" />
        </div>
      </div>
      <div className="bg-headerGrey rounded-lg  px-4 pt-2 pb-14 mt-3 flex justify-between flex-col-reverse 2xl:flex-row">
        <div className="mt-5 2xl:mt-0">
          <div className="text-fadeWhite font-bold ">Who I Am</div>
          {characterInfo.map((item) => (
            <div className="text-fadeWhite ">
              <div className="text-base font-semibold mt-2"> {item.header}</div>{" "}
              <div className="text-sm"> {item.info ? item.info : "--"}</div>
            </div>
          ))}
        </div>
        <div className=" 2xl:max-w-60 2xl:min-w-60 text-fadeWhite relative pt-5 2xl:pt-0">
          <div className="text-white flex justify-between items-center font-bold">
            About Me{" "}
            <FiEdit
              onClick={() => setEditFormVisibility(true)}
              className="cursor-pointer absolute right-0 top-0 z-50"
            />
          </div>
          <p className="leading-5 mt-3">
            {character.about ? character.about : "--"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterDetail;
