import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import styled from "styled-components";
import { isMobile } from "react-device-detect";
import { getApiRequest } from "../../helpers/api";
import { BOARDS_URL, NOT_FOUND_URL } from "../../helpers/mappings";
import useUpdater from "../../helpers/useUpdater";
import { BoardType, ThreadCatalogType } from "../../types";
import ThreadCatalog from "../thread/ThreadCatalog";
import ThreadForm from "../thread/ThreadForm";
import { BoardContext } from "./Board";
import BoardHeader from "./BoardHeader";
import { AppContext } from "../App";
import BoardCatalogMenu from "./BoardCatalogMenu";

const ThreadList = styled(Grid)`
  padding: 20px !important;
  text-align: center;
  min-width: 100% !important;
`;
function BoardCatalog() {
  const { label } = useParams();

  const { setActiveMenuPath } = useContext(AppContext);

  const [board, setBoard] = useState<BoardType>();
  const [threads, setThreads] = useState<ThreadCatalogType[]>([]);
  const [showOP, setShowOP] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  const refreshCatalog = useUpdater();

  useEffect(() => {
    setActiveMenuPath(label);

    getApiRequest<BoardType>(`${BOARDS_URL}/${label}/catalog`)
      .then((result) => {
        setBoard(result);
        if (result.threads) {
          setThreads(result.threads);
        }
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setNotFound(true);
        }
      });
  }, [label, setActiveMenuPath, setBoard]);

  if (notFound) {
    return <Redirect to={NOT_FOUND_URL} />;
  }

  return (
    (board && (
      <BoardContext.Provider value={board}>
        <BoardHeader catalog />
        <ThreadForm />
        <BoardCatalogMenu
          threads={threads}
          setThreads={setThreads}
          showOP={showOP}
          setShowOP={setShowOP}
          refreshCatalog={refreshCatalog}
        />
        <ThreadList container relaxed>
          <ThreadList.Row columns={isMobile ? 2 : 10}>
            {threads.map((thread) => (
              <ThreadCatalog
                thread={thread}
                key={thread.originalPost.postNumber}
                showOP={showOP}
              />
            ))}
          </ThreadList.Row>
        </ThreadList>
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default BoardCatalog;
