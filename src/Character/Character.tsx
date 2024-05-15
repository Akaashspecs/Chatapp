import { useCharacter } from "../Provider/CharacterProvider";
import { useConversations } from "../Provider/ConversationProvider";
import CharacterDetail from "./CharacterDetail";
import "./character.css";

const CharacterProfile = ({
  characterClassName,
  infoClassName,
}: {
  characterClassName: string;
  infoClassName?: string;
}) => {
  const { characters } = useCharacter();
  const { totalConversation, formattedConversationsWithUser } =
    useConversations();
  const character = characters.filter((o) => o.isSelected === true);

  return (
    <div
      className={`${characterClassName}  no-scroll relative min-w-[300px] 2xl:min-w-[450px]   overflow-y-auto overflow-x-hidden  md:flex flex-col`}
    >
      <div className=" relative  ">
        <div className="pl-2 absolute min-w-[300px] 2xl:w-[450px] overflow-hidden  z-10 bg-gradient-to-b from-headerGrey from-65% to-transparent  pb-2 text-fadeWhite ">
          Total Chats : {totalConversation}
        </div>
        <img
          className="w-[300px] h-[300px]  2xl:h-[450px] 2xl:w-[450px] object-cover"
          src={character[0].image as string}
        />{" "}
        <div className="absolute text-fadeWhite z-50  backdrop-blur-md bottom-0 w-full px-8">
          <p className="text-2xl">{character[0].name}</p>
          <p>@-{character[0].userName}</p>
        </div>
      </div>
      <div
        className={`${infoClassName} bg-gradient-to-b from-darkMagenta from-10% to-lightMagenta grow`}
      >
        <CharacterDetail
          character={character[0]}
          chatWithCharacter={formattedConversationsWithUser.length}
        />
      </div>
    </div>
  );
};

export default CharacterProfile;
