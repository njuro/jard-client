import React, { createContext, useEffect, useState } from "react";

import { getApiRequest } from "../helpers/api";
import { BrowserRouter as Router } from "react-router-dom";
import TopMenu from "./base/TopMenu";
import RouteSwitch from "./base/RouteSwitch";
import { USERS_URL } from "../helpers/mappings";

export const AuthContext = createContext({});

function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    getApiRequest(USERS_URL + "/current").then(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <nav>
          <TopMenu />
        </nav>
        <main>
          <RouteSwitch />
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
