import React, { createContext, useEffect, useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";
import { getApiRequest } from "../helpers/api";
import { USERS_URL } from "../helpers/mappings";
import { SetStateType, UserType } from "../types";
import MainMenu from "./base/MainMenu";
import MainSwitch from "./base/MainSwitch";
import { isLocal } from "../helpers/utils";

interface AppContextProps {
  user: UserType;
  setUser: SetStateType<UserType | undefined>;
  userLoading: boolean;
  activeMenuPath?: string;
  setActiveMenuPath: SetStateType<string | undefined>;
}
export const AppContext = createContext<AppContextProps>({} as AppContextProps);

function App() {
  const [user, setUser] = useState<UserType>();
  const [userLoading, setUserLoading] = useState(true);
  const [activeMenuPath, setActiveMenuPath] = useState<string>();

  useEffect(() => {
    getApiRequest<UserType>(`${USERS_URL}/current`)
      .then(setUser)
      .finally(() => setUserLoading(false));
  }, []);

  return (
    <HttpsRedirect disabled={isLocal()}>
      <AppContext.Provider
        value={{
          user: user as UserType,
          setUser,
          userLoading,
          activeMenuPath,
          setActiveMenuPath,
        }}
      >
        <Router>
          <nav>
            <MainMenu />
          </nav>
          <main>
            <MainSwitch />
          </main>
        </Router>
      </AppContext.Provider>
    </HttpsRedirect>
  );
}

export default App;
