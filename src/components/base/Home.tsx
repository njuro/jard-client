import React, { useContext, useEffect } from "react";
import { formatTimestamp } from "../../helpers/utils";
import { AppContext } from "../App";
import { HOME_URL } from "../../helpers/mappings";

function Home() {
  const { setActiveMenuPath } = useContext(AppContext);

  useEffect(() => setActiveMenuPath(HOME_URL), [setActiveMenuPath]);

  return (
    <div>
      Welcome to <strong>jard</strong>. <p />
      Current time: {formatTimestamp(new Date().toISOString())}
    </div>
  );
}

export default Home;
