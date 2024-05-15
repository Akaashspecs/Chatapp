import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaSortDown } from "react-icons/fa";
import { GiHeartBeats } from "react-icons/gi";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";

const Profile = ({
  setFormVisibility,
  tab,
  setTab,
}: {
  setFormVisibility: (e: boolean) => void;
  tab: {
    icon: JSX.Element;
    text: string;
    isSelected: boolean;
    path: string;
  }[];
  setTab: React.Dispatch<
    React.SetStateAction<
      {
        icon: JSX.Element;
        text: string;
        isSelected: boolean;
        path: string;
      }[]
    >
  >;
}) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const tabSelected = tab.map((item) => {
      if (item.path === location.pathname) {
        return {
          ...item,
          isSelected: true,
        };
      } else
        return {
          ...item,
          isSelected: false,
        };
    });
    setTab(tabSelected);
  }, [location]);

  const tabChange = (e: string) => {
    const tabSelected = tab.map((item) => {
      if (item.text === e) {
        return {
          ...item,
          isSelected: true,
        };
      } else
        return {
          ...item,
          isSelected: false,
        };
    });
    setMenuOpen(false);
    setTab(tabSelected);
  };

  return (
    <div className="flex items-center">
      <div className="hidden ml-6 lg:flex items-center text-gray-200 gap-1 font-semibold">
        <CgProfile /> My Profile <FaSortDown className="mb-1" />
      </div>
      <div className="relative lg:hidden cursor-pointer">
        <IoIosMenu
          className=" text-2xl text-pink font-semibold "
          onClick={() => {
            setMenuOpen(true);
          }}
        />
        {menuOpen === true && (
          <div className="bg-headerGrey overflow-hidden  z-50 w-44 absolute -left-36 shadow-2xl  rounded-xl">
            {" "}
            <div
              className="bg-pink px-3  h-10 text-white font-semibold flex items-center "
              onClick={() => setFormVisibility(true)}
            >
              <GiHeartBeats /> Create Character
            </div>
            <div className="flex flex-col h-full">
              {tab.map((item) => (
                <div
                  key={item.path}
                  className="h-10 border-b border-b-zinc-700"
                  onClick={() => tabChange(item.text)}
                >
                  <Link
                    to={item.path}
                    className={`flex  font-semibold  items-center w-auto px-1 hover:cursor-pointer mx-2 h-full ${
                      item.isSelected === true ? "text-pink " : "text-white"
                    }`}
                  >
                    {item.icon}
                    {item.text}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
