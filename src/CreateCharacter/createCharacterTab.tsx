import { RxCross2 } from "react-icons/rx";
import NewCharacterForm from "./NewCharacterForm";

const CharacterTab = ({
  setFormVisibility,
}: {
  setFormVisibility: (e: boolean) => void;
}) => {
  return (
    <div className="absolute top-0 h-screen w-screen z-[60] backdrop-blur-sm flex justify-center items-center">
      <div className="w-[430px] sm:w-[500px] h-[720px] bg-headerGrey drop-shadow-2xl text-fadeWhite sm:px-14 px-5 mx-2 relative ">
        <RxCross2
          onClick={() => setFormVisibility(false)}
          className="absolute right-0 mt-3 mr-3 cursor-pointer"
        />

        <div className="text-pink text-4xl font-sans font-semibold mt-10">
          Create Character
        </div>
        <NewCharacterForm setFormVisibility={setFormVisibility} />
      </div>
    </div>
  );
};

export default CharacterTab;
