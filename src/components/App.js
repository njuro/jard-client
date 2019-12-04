import React, { createContext, useEffect, useState } from "react";

import { getApiRequest } from "../helpers/api";
import { BrowserRouter as Router } from "react-router-dom";
import MainMenu from "./base/MainMenu";
import MainSwitch from "./base/MainSwitch";
import { USERS_URL } from "../helpers/mappings";

export const AuthContext = createContext({});

function App() {
  const [user, setUser] = useState(undefined);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    getApiRequest(USERS_URL + "/current")
      .then(setUser)
      .finally(() => setUserLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userLoading }}>
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
