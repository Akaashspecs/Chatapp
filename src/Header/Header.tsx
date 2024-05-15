import HeaderLogo from "./HeaderLogo";
import HeaderTabs from "./HeaderTabs";
import Profile from "./Profile";
import { useState } from "react";
import { TbMessageDots } from "react-icons/tb";
import { IoMdPeople } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import CharacterInfoTab from "./CharacterInfo";

function Header({
  setFormVisibility,
}: {
  setFormVisibility: (e: boolean) => void;
}) {
  const tabs = [
    {
      icon: <TbMessageDots />,
      text: "Chat",
      isSelected: true,
      path: "/",
    },
    {
      icon: <IoMdPeople />,
      text: "My Characters",
      isSelected: false,
      path: "/character",
    },
    {
      icon: <IoCamera />,
      text: "Generate Images",
      isSelected: false,
      path: "/generate_image",
    },
  ];

  const [tab, setTab] = useState<
    {
      icon: JSX.Element;
      text: string;
      isSelected: boolean;
      path: string;
    }[]
  >(tabs);

  return (
    <div className="bg-headerGrey h-16 flex justify-between px-7 lg:px-14  drop-shadow-2xl">
      <HeaderLogo />
      <HeaderTabs
        tab={tab}
        setTab={setTab}
        setFormVisibility={setFormVisibility}
      />
      <CharacterInfoTab />
      <Profile
        tab={tab}
        setTab={setTab}
        setFormVisibility={setFormVisibility}
      />
    </div>
  );
}

export default Header;
