import { useContext, createContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useCharacter } from "./CharacterProvider";
import { useUser } from "./UserProvider";

interface RecieveMessage {
  id: string;
  recipient: string;
  text: string;
  sender: string;
  textLiked?: boolean;
  textDisliked?: boolean;
}

interface ConversationsContextType {
  sendMessage: (message: SendMessageData) => void;
  sendMessageByAPI: (message: SendMessageData) => void;
  createConversation: (recipient: string) => void;
  conversationLiked: (id: string) => void;
  conversationDisliked: (id: string) => void;
  formattedConversationsWithUser: RecieveMessage[];
  totalConversation: number;
}

interface SendMessageData {
  recipient: string;
  text: string;
  sender: string;
  id: string;
  textLiked?: boolean;
  textDisliked?: boolean;
}

const ConversationsContext = createContext<ConversationsContextType>({
  sendMessage: () => {},
  createConversation: () => {},
  sendMessageByAPI: () => {},
  conversationLiked: () => {},
  conversationDisliked: () => {},
  formattedConversationsWithUser: [],
  totalConversation: 0,
});

export function useConversations() {
  return useContext(ConversationsContext);
}

export function ConversationsProvider({ children }: { children: JSX.Element }) {
  const [conversations, setConversations] = useLocalStorage("conversations", [
    {
      recipient: "",
      sender: "",
      text: "",
    },
  ] as RecieveMessage[]);
  const { characters } = useCharacter();
  const { user } = useUser();

  function createConversation(recipient: string) {
    setConversations((prevConversations: RecieveMessage[]) => {
      return [...prevConversations, { recipient, messages: [] }];
    });
  }

  const addMessageToConversation = (message: RecieveMessage) => {
    setConversations((prevConversations: RecieveMessage[]) => [
      ...prevConversations,
      message,
    ]);
  };

  function sendMessage({
    recipient,
    text,
    sender,
    id,
    textLiked,
    textDisliked,
  }: {
    recipient: string;
    text: string;
    sender: string;
    id: string;
    textLiked?: boolean;
    textDisliked?: boolean;
  }) {
    addMessageToConversation({
      recipient,
      text,
      sender,
      id,
      textLiked,
      textDisliked,
    });
  }

  function sendMessageByAPI({
    sender,
    text,
    recipient,
    id,
    textLiked,
    textDisliked,
  }: {
    sender: string;
    text: string;
    recipient: string;
    id: string;
    textLiked?: boolean;
    textDisliked?: boolean;
  }) {
    addMessageToConversation({
      recipient,
      text,
      sender,
      id,
      textLiked,
      textDisliked,
    });
  }
  const character = characters.filter((o) => o.isSelected === true);
  const formattedConservations = conversations.filter(
    (conversation: RecieveMessage) => {
      return (
        (conversation.recipient === character[0].id &&
          conversation.sender === user.id) ||
        (conversation.sender === character[0].id &&
          conversation.recipient === user.id)
      );
    }
  );

  const conversationLiked = (id: string) => {
    const likedData = conversations.map((item: any) => {
      if (id === item.id && item.textDisliked === false) {
        return {
          ...item,
          textLiked: !item.textLiked,
        };
      }
      if (id === item.id && item.textDisliked === true) {
        return {
          ...item,
          textLiked: true,
          textDisliked: false,
        };
      } else {
        return item;
      }
    });
    setConversations(likedData);
  };

  const conversationDisliked = (id: string) => {
    const dislikedData = conversations.map((item: any) => {
      if (id === item.id && item.textLiked === false) {
        return {
          ...item,
          textDisliked: !item.textDisliked,
        };
      }
      if (id === item.id && item.textLiked === true) {
        return {
          ...item,
          textDisliked: true,
          textLiked: false,
        };
      } else {
        return item;
      }
    });
    setConversations(dislikedData);
  };

  const formattedConversationsWithUser = formattedConservations.map(
    (conversation: RecieveMessage) => {
      return { ...conversation, userId: user.id, characterId: character[0].id };
    }
  );

  const totalConversation = conversations.length - 1;

  const value = {
    sendMessage,
    sendMessageByAPI,
    createConversation,
    formattedConversationsWithUser,
    conversationLiked,
    conversationDisliked,
    totalConversation,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
}
