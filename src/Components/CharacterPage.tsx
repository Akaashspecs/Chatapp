import { useCharacter } from "../Provider/CharacterProvider";
import { ImCheckboxChecked } from "react-icons/im";

const Characters = () => {
  const { characters, isSelectedCharacter } = useCharacter();

  const selectCharacter = (e: string) => {
    isSelectedCharacter(e);
  };

  return (
    <div className=" h-full w-full bg-chatBoxGrey pt-7 px-10 flex flex-col items-center lg:items-start">
      <h1 className="text-pink text-4xl">Select Character</h1>
      <div className="hide-scroll flex gap-2 flex-wrap mt-7 justify-center lg:justify-start max-h-[calc(100vh-25%)]  overflow-y-scroll ">
        {characters.map((item) => (
          <div
            key={item.id}
            className="h-48 w-80   xl:h-60 xl:w-96 overflow-hidden rounded-md  relative cursor-pointer "
            onClick={() => selectCharacter(item.id)}
          >
            {item.isSelected === true && (
              <ImCheckboxChecked className="z-50 absolute text-2xl mt-1 ml-1 text-amber-600" />
            )}
            <p className="text-white absolute flex z-50  left-0 bottom-0   w-full justify-center items-center text-2xl font-medium ">
              {item.name}
            </p>
            <div className="h-full w-full bg-zinc-900 hover:blur-md">
              <img
                src={item.image as string}
                alt="preview"
                className="rounded-2xl h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Characters;
