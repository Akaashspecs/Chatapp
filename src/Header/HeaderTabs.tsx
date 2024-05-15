import { useEffect } from "react";
import { GiHeartBeats } from "react-icons/gi";
import { Link } from "react-router-dom";

const HeaderTabs = ({
  setFormVisibility,
  setTab,

  tab,
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

    setTab(tabSelected);
  };

  return (
    <div className="hidden  ml-6 lg:flex items-center">
      <div className="flex h-full">
        {tab.map((item) => (
          <div
            key={item.path}
            className="h-full"
            onClick={() => tabChange(item.text)}
          >
            <Link
              to={item.path}
              className={`flex font-semibold gap-1 items-center w-auto px-1 hover:cursor-pointer mx-2 h-full ${
                item.isSelected === true
                  ? "text-pink border-b-4 border-pink"
                  : "text-white"
              }`}
            >
              {item.icon}
              {item.text}
            </Link>
          </div>
        ))}
      </div>
      <div
        className="bg-pink h-min p-1.5 rounded-xl text-white font-semibold flex items-center gap-1 cursor-pointer"
        onClick={() => setFormVisibility(true)}
      >
        <GiHeartBeats /> Create Character
      </div>
    </div>
  );
};

export default HeaderTabs;
