import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import CharacterProfile from "../Character/Character";

const CharacterInfoTab = () => {
  const [characterInfo, setCharacterInfo] = useState<boolean>(false);
  return (
    <div className="lg:hidden  flex items-center">
      <div
        className=" block md:hidden  border border-pink hover:bg-pink text-white rounded-md px-3 py-2 cursor-pointer"
        onClick={() => setCharacterInfo(true)}
      >
        Character Info
      </div>

      {characterInfo === true && (
        <div className="md:hidden absolute top-0 left-0 h-screen w-screen z-[60] backdrop-blur-sm  flex justify-center items-center">
          <div className="w-[340px] h-[720px] bg-headerGrey drop-shadow-2xl text-fadeWhite sm:px-8 px-3  relative flex flex-col items-center">
            <RxCross2
              className="absolute right-0 mt-3 mr-3 cursor-pointer"
              onClick={() => setCharacterInfo(false)}
            />

            <div className="text-pink text-4xl font-sans font-semibold mt-10">
              Character Info
            </div>
            <div className="mt-2 hide-scroll overflow-y-scroll h-[580px] w-min">
              {" "}
              <CharacterProfile
                characterClassName="block md:hidden"
                infoClassName="py-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterInfoTab;
