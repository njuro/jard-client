import React, { createContext, useEffect, useState } from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { getApiRequest } from "../helpers/api";
import { USERS_URL } from "../helpers/mappings";
import { SetStateType, UserType } from "../types";
import MainMenu from "./base/MainMenu";
import MainSwitch from "./base/MainSwitch";

interface AuthContextProps {
  user: UserType;
  setUser: SetStateType<UserType | undefined>;
  userLoading: boolean;
}
export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

function App() {
  const [user, setUser] = useState<UserType>();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    getApiRequest<UserType>(`${USERS_URL}/current`)
      .then(setUser)
      .finally(() => setUserLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: user as UserType, setUser, userLoading }}
    >
      <Router>
        <nav>
          <MainMenu />
        </nav>
        <main>
          <MainSwitch />
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
