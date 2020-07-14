import React, { useContext, useEffect } from "react";
import { formatTimestamp } from "../../helpers/utils";
import { AppContext } from "../App";
import { MENU_ITEM_HOME } from "./MainMenu";

function Home() {
  const { setActiveMenuItem } = useContext(AppContext);

  useEffect(() => setActiveMenuItem(MENU_ITEM_HOME));

  return (
    <div>
      Welcome to <strong>jard</strong>. <p />
      Current time: {formatTimestamp(new Date().toISOString())}
    </div>
  );
}

export default Home;
