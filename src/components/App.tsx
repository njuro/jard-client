import React, { createContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { BrowserRouter as Router } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";
import { ThemeProvider } from "styled-components/macro";
import { apiErrorHandler, getApiRequest } from "../helpers/api";
import { USERS_URL } from "../helpers/mappings";
import { InputConstraintsType, SetStateType, UserType } from "../types";
import MainMenu from "./base/MainMenu";
import MainSwitch from "./base/MainSwitch";
import { isLocalhost, randomString } from "../helpers/utils";
import { GlobalStyle, theme } from "../helpers/theme";
import ApiErrorStatus from "./utils/NotificationContainer";
import {
  LocalStorageKey,
  saveToLocalStorageIfMissing,
} from "../helpers/localStorageItems";

interface AppContextProps {
  user: UserType;
  setUser: SetStateType<UserType | undefined>;
  userLoading: boolean;
  inputConstraints: InputConstraintsType;
  activeMenuPath?: string;
  setActiveMenuPath: SetStateType<string | undefined>;
}
export const AppContext = createContext<AppContextProps>({} as AppContextProps);

function App() {
  const [user, setUser] = useState<UserType>();
  const [userLoading, setUserLoading] = useState(true);
  const [inputConstraints, setInputConstraints] =
    useState<InputConstraintsType>();
  const [activeMenuPath, setActiveMenuPath] = useState<string>();

  useEffect(() => {
    getApiRequest<UserType>(`${USERS_URL}/current`)
      .then(setUser)
      .catch(apiErrorHandler)
      .finally(() => setUserLoading(false));

    getApiRequest<InputConstraintsType>("/input-constraints")
      .then(setInputConstraints)
      .catch(apiErrorHandler);

    saveToLocalStorageIfMissing(LocalStorageKey.DELETION_CODE, randomString(8));
  }, []);

  return (
    <HttpsRedirect
      disabled={isLocalhost() || window.location.hostname.endsWith(".local")}
    >
      <AppContext.Provider
        value={{
          user: user as UserType,
          setUser,
          userLoading,
          inputConstraints: inputConstraints as InputConstraintsType,
          activeMenuPath,
          setActiveMenuPath,
        }}
      >
        <Helmet titleTemplate="%s - jard" defaultTitle="jard" />
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router>
            <nav>
              <MainMenu />
            </nav>
            <main>
              <ApiErrorStatus />
              <MainSwitch />
            </main>
          </Router>
        </ThemeProvider>
      </AppContext.Provider>
    </HttpsRedirect>
  );
}

export default App;
