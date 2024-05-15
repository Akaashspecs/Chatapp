import CharacterProfile from "../Character/Character";
import ChatScreen from "../Conversation/ChatScreen";

const ChatPage = () => {
  return (
    <div className="flex overflow-hidden h-full w-full">
      <CharacterProfile characterClassName="hidden" />

      <div className="bg-chatBoxGrey w-full ">
        <ChatScreen />
      </div>
    </div>
  );
};

export default ChatPage;
