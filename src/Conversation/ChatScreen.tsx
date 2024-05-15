import { useCallback, useState } from "react";
import { useCharacter } from "../Provider/CharacterProvider";
import { useConversations } from "../Provider/ConversationProvider";
import TextInput from "../Components/TextInput";
import { useUser } from "../Provider/UserProvider";
import "./chatScreen.css";
import { ThreeDots } from "react-loader-spinner";
import { HiSpeakerWave } from "react-icons/hi2";
import { BiSolidDislike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { MdOutlineContentCopy } from "react-icons/md";
import { toast } from "react-toastify";

const ChatScreen = () => {
  const {
    formattedConversationsWithUser,
    conversationLiked,
    conversationDisliked,
  } = useConversations();
  const synth = window.speechSynthesis;

  const speakText = (text: string) => {
    if (synth.speaking) {
      toast.warn("Character is already speaking", {
        position: "bottom-center",
        theme: "dark",
        autoClose: 1500,
        hideProgressBar: true,
      });
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  const handleCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");

    document.body.removeChild(textArea);
    toast.success("Text Copied", {
      position: "bottom-center",
      theme: "dark",
      autoClose: 1500,
      hideProgressBar: true,
    });
  };

  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const { characters } = useCharacter();
  const character = characters.filter((o) => o.isSelected === true);
  const setRef = useCallback((node: any) => {
    if (node) {
      node.scrollIntoView({ smooth: true });
    }
  }, []);

  const messageLiked = (id: string) => {
    conversationLiked(id);
  };
  const messageDisLiked = (id: string) => {
    conversationDisliked(id);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div
        className={`hide-scroll grow w-full  flex flex-col overflow-y-scroll p-3`}
      >
        {formattedConversationsWithUser.map((item: any, index: number) => {
          const lastMessage =
            formattedConversationsWithUser.length - 1 === index;

          return (
            <div
              ref={lastMessage ? setRef : null}
              key={index}
              className={`flex flex-col  ${
                item.sender === item.userId ? "  " : ""
              }   `}
            >
              <div
                className={`  ${
                  item.sender === item.userId ? " justify-end  " : ""
                } flex`}
              >
                {" "}
                {item.sender === item.userId && (
                  <div className="text-white flex text-sm items-center">
                    {" "}
                    {user.name}{" "}
                    <img
                      src={user.profileImg}
                      className="rounded-full h-7 w-7 mx-2"
                    />
                  </div>
                )}
                {item.sender === item.characterId && (
                  <div className="ml-3 text-white flex flex-row-reverse text-sm items-center gap-1 mt-1">
                    {" "}
                    {character[0].name}
                    {}
                    <img
                      src={character[0].image as string}
                      className="rounded-full object-cover h-7 w-7"
                    />
                  </div>
                )}
              </div>
              <div
                className={`text-sm lg:text-base max-w-[calc(100vw-30%)] lg:max-w-[calc(100vw-60%)]  flex text-fadeWhite px-3 py-2 rounded mt-1 ${
                  item.sender === item.userId
                    ? "bg-headerGrey justify-end self-end "
                    : "bg-pink"
                }`}
              >
                {item.text}
              </div>
              <div
                className={`flex gap-1 mt-2 text-xl text-headerGrey ${
                  item.sender === item.userId ? "hidden" : ""
                }`}
              >
                <HiSpeakerWave
                  className="cursor-pointer hover:text-green-500"
                  onClick={() => speakText(item.text)}
                />

                <BiSolidLike
                  className={`cursor-pointer ${
                    item.textLiked === true && "text-blue-500 "
                  }`}
                  onClick={() => messageLiked(item.id)}
                />
                <BiSolidDislike
                  className={`cursor-pointer  ${
                    item.textDisliked === true && "text-red-500 "
                  }`}
                  onClick={() => messageDisLiked(item.id)}
                />
                <MdOutlineContentCopy
                  className="cursor-pointer hover:text-amber-500"
                  onClick={() => handleCopyText(item.text)}
                />
              </div>
              <div
                className={`flex justify-end gap-1 mt-2 text-xl text-headerGrey ${
                  item.recipient === item.userId ? "hidden" : ""
                }`}
              >
                <HiSpeakerWave
                  className="cursor-pointer hover:text-green-500"
                  onClick={() => speakText(item.text)}
                />

                <MdOutlineContentCopy
                  className="cursor-pointer hover:text-amber-500"
                  onClick={() => handleCopyText(item.text)}
                />
              </div>
            </div>
          );
        })}
        {loading === true && (
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color={"#7f1e3b"}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
      </div>

      <TextInput setLoading={setLoading} />
    </div>
  );
};
export default ChatScreen;
