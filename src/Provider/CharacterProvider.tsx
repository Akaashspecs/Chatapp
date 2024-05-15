import React, { useContext } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { ImgSrc } from "../utils/helper";

export interface Character {
  id: string;
  name: string;
  image: string | ArrayBuffer | null;
  userName: string;
  work?: string;
  personality?: string;
  hobbies?: string;
  relationship?: string;
  about?: string;
  isSelected: boolean;
}

const CharacterContext = React.createContext<{
  characters: Character[];
  createCharacter: (
    id: string,
    name: string,
    image: string | ArrayBuffer | null,
    userName: string,
    isSelected: boolean,
    work?: string,
    personality?: string,
    hobbies?: string,
    relationship?: string,
    about?: string
  ) => void;

  editCharacter: (
    id: string,
    name: string,
    image: string | ArrayBuffer | null,
    userName: string,
    isSelected: boolean,
    work?: string,
    personality?: string,
    hobbies?: string,
    relationship?: string,
    about?: string
  ) => void;
  editCharacterImage: (id: string, image: string | ArrayBuffer | null) => void;
  isSelectedCharacter: (id: string) => void;
}>({
  characters: [],
  createCharacter: () => {},
  isSelectedCharacter: () => {},
  editCharacter: () => {},
  editCharacterImage: () => {},
});

export function useCharacter() {
  return useContext(CharacterContext);
}

export function CharacterProvider({ children }: { children: JSX.Element }) {
  const [characters, setCharacters] = useLocalStorage("characters", [
    {
      id: "df",
      name: "Megha",
      userName: "Mega Rana",
      personality: "Caregiver",
      work: "Yoga Instructor",
      hobbies: "Anime Fan",
      about: "Friend",
      relationship: "Friend",
      image: ImgSrc,
      isSelected: true,
    },
  ] as Character[]);

  function createCharacter(
    id: string,
    name: string,
    image: string | ArrayBuffer | null,
    userName: string,
    isSelected: boolean,
    work?: string,
    personality?: string,
    hobbies?: string,
    relationship?: string,
    about?: string
  ) {
    setCharacters((prevCharacters: Character[]) => {
      return [
        ...prevCharacters,
        {
          id,
          name,
          image,
          userName,
          work,
          personality,
          hobbies,
          relationship,
          about,
          isSelected,
        },
      ];
    });
  }

  function editCharacter(
    id: string,
    name: string,
    image: string | ArrayBuffer | null,
    userName: string,
    isSelected: boolean,
    work?: string,
    personality?: string,
    hobbies?: string,
    relationship?: string,
    about?: string
  ) {
    setCharacters((Characters: Character[]) => {
      const editSelectedCharacter = Characters.map((item) => {
        if (id === item.id) {
          return {
            id,
            name,
            image,
            userName,
            work,
            personality,
            hobbies,
            relationship,
            about,
            isSelected,
          };
        } else return item;
      });
      return editSelectedCharacter;
    });
  }

  function editCharacterImage(
    id: string,

    image: string | ArrayBuffer | null
  ) {
    setCharacters((Characters: Character[]) => {
      const editSelectedCharacter = Characters.map((item) => {
        if (id === item.id) {
          return { ...item, image: image };
        } else return item;
      });
      return editSelectedCharacter;
    });
  }

  function isSelectedCharacter(id: string) {
    setCharacters((prevCharacters: Character[]) => {
      const selectCharacter = prevCharacters.map((item) => {
        if (item.id === id) {
          return { ...item, isSelected: true };
        } else return { ...item, isSelected: false };
      });
      return selectCharacter;
    });
  }

  const contextValue = {
    characters,
    createCharacter,
    isSelectedCharacter,
    editCharacter,
    editCharacterImage,
  };

  return (
    <CharacterContext.Provider value={contextValue}>
      {children}
    </CharacterContext.Provider>
  );
}
