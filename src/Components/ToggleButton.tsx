import { useState } from "react";

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="text-pink text-sm flex items-center">
      text
      <div
        className="ml-2 relative inline-block w-8 mr-2 align-middle select-none "
        onClick={handleToggle}
      >
        <input
          type="checkbox"
          className={`toggle-checkbox absolute block w-4 h-4 rounded-full  border-2 border-mediumGrey appearance-none cursor-pointer ${
            isToggled ? "right-0 bg-pink " : "left-0 bg-pink"
          }`}
        />
        <label
          htmlFor="toggle"
          className={`toggle-label block overflow-hidden h-4 rounded-full ${
            isToggled ? "bg-lightMagenta " : "bg-lightGrey"
          } cursor-pointer`}
        ></label>
      </div>
    </div>
  );
};
export default ToggleButton;
