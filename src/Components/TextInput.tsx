import { useEffect, useRef, useState } from "react";
import ToggleButton from "./ToggleButton";
import { BsSendFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { MdEmojiEmotions } from "react-icons/md";
import { useConversations } from "../Provider/ConversationProvider";
import { useCharacter } from "../Provider/CharacterProvider";
import { fetchData } from "../Api/FetchAPI";
import { useUser } from "../Provider/UserProvider";
import { v4 as uuidV4 } from "uuid";

const TextInput = ({ setLoading }: { setLoading: (e: boolean) => void }) => {
  const { sendMessage, sendMessageByAPI } = useConversations();
  const [emojiVisibility, setEmojivisibility] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const { characters } = useCharacter();
  const { user } = useUser();
  const handleEmojiVisibility = (e: { emoji: string }) => {
    setText((prev) => prev + e.emoji);
  };

  const box = useRef(null);
  useOutsideAlerter(box);

  function useOutsideAlerter(ref: React.RefObject<HTMLElement>) {
    useEffect(() => {
      function handleOutsideClick(event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setEmojivisibility(false);
        }
      }
      document.addEventListener("click", handleOutsideClick);
      return () => document.removeEventListener("click", handleOutsideClick);
    }, [emojiVisibility]);
  }

  const sendMessageFunction = async () => {
    const message = text;
    setText("");
    const character = characters.filter((o) => o.isSelected === true);
    if (message !== "") {
      sendMessage({
        recipient: character[0].id,
        text: message,
        sender: user.id,
        id: uuidV4(),
        textLiked: false,
        textDisliked: false,
      });

      setLoading(true);
      const messageByAPI = await fetchData(message);
      setLoading(false);
      sendMessageByAPI({
        sender: character[0].id,
        text: messageByAPI as string,
        recipient: user.id,
        id: uuidV4(),
        textLiked: false,
        textDisliked: false,
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessageFunction();
    }
  };

  return (
    <div className="flex flex-col items-center mb-2 ">
      <div className="xl:w-[900px] w-2/3 flex flex-col items-center">
        <div className="w-[calc(100vw-30%)]  sm:w-[500px] xl:w-full flex justify-end pr-10 mb-1">
          <ToggleButton />
        </div>
        <div className="flex w-[440px]  xl:w-[900px]  justify-center">
          <div className="w-[calc(100vw-30%)] flex sm:w-[400px] xl:w-[900px] border-[3px]  rounded-md   border-red-700 items-center px-1 relative">
            <input
              className="bg-transparent focus:outline-none  rounded-md w-full  text-gray-400 px-2 py-1"
              placeholder="Type a message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div ref={box}>
              <MdEmojiEmotions
                className="text-yellow-500 text-2xl"
                onClick={() => setEmojivisibility((prev) => !prev)}
              />
              <div className="absolute -right-14 z-50 -top-[460px]   ">
                <EmojiPicker
                  open={emojiVisibility}
                  onEmojiClick={(e) => handleEmojiVisibility(e)}
                />
              </div>
            </div>
          </div>
          <div
            className="bg-toggleButtonGrey text-fadeWhite flex justify-center items-center w-9 h-9 rounded-full cursor-pointer ml-2"
            onClick={() => sendMessageFunction()}
          >
            {" "}
            <BsSendFill className="absolute z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default TextInput;
