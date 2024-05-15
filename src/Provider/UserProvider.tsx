import { createContext, useContext, useEffect, useState } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import { profileImg } from "../utils/helper";

const UserContext = createContext<{
  user: { id: string; name: string; profileImg: string };
  createUser: (id: string, name: string, profileImg: string) => void;
}>({ user: { id: "", name: "", profileImg }, createUser: () => {} });

export function useUser() {
  return useContext(UserContext);
}

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [storedUser, setStoredUser] = useLocalStorage("user", {
    id: uuidV4(),
    name: "Aakash Saxena",
    profileImg: profileImg,
  });
  const [user, setUser] = useState(storedUser);

  useEffect(() => {
    setUser(storedUser);
  }, [storedUser]);

  function createUser(id: string, name: string, profileImg: string) {
    setStoredUser({ id, name, profileImg });
  }

  return (
    <UserContext.Provider value={{ user, createUser }}>
      {children}
    </UserContext.Provider>
  );
};
