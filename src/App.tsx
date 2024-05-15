import { createContext, useState } from "react";
import Header from "./Header/Header";
import { UserProvider } from "./Provider/UserProvider";
import ChatPage from "./Components/chatPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Characters from "./Components/CharacterPage";
import CharacterTab from "./CreateCharacter/createCharacterTab";
import { CharacterProvider } from "./Provider/CharacterProvider";
import { ConversationsProvider } from "./Provider/ConversationProvider";
import EditCharacterTab from "./EditCharacter/EditCharacter";
import GenerateImage from "./Components/GenerateImage";

export const FormContext = createContext<{
  editFormVisibility: boolean;
  setEditFormVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}>({ editFormVisibility: false, setEditFormVisibility: () => {} });

function App() {
  const [formVisibility, setFormVisibility] = useState<boolean>(false);
  const [editFormVisibility, setEditFormVisibility] = useState<boolean>(false);

  return (
    <div className=" h-screen flex flex-col ">
      <BrowserRouter>
        <UserProvider>
          <CharacterProvider>
            <ConversationsProvider>
              <FormContext.Provider
                value={{ editFormVisibility, setEditFormVisibility }}
              >
                <>
                  <Header setFormVisibility={setFormVisibility} />
                  <div className=" flex overflow-hidden h-full">
                    <Routes>
                      <Route path="/" element={<ChatPage />}></Route>
                      <Route path="/character" element={<Characters />}></Route>
                      <Route
                        path="/generate_image"
                        element={<GenerateImage />}
                      ></Route>
                    </Routes>
                  </div>
                  {formVisibility && (
                    <CharacterTab setFormVisibility={setFormVisibility} />
                  )}
                  {editFormVisibility && (
                    <EditCharacterTab
                      setFormVisibility={setEditFormVisibility}
                    />
                  )}
                </>
              </FormContext.Provider>
            </ConversationsProvider>
          </CharacterProvider>
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
