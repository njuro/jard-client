import React, { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import { apiErrorHandler, getApiRequest } from "../../helpers/api";
import { BOARDS_URL, NOT_FOUND_URL } from "../../helpers/mappings";
import useUpdater from "../../helpers/useUpdater";
import { BoardType, ThreadCatalogType } from "../../types";
import ThreadCatalog from "../thread/ThreadCatalog";
import ThreadForm from "../thread/ThreadForm";
import { BoardContext } from "./Board";
import BoardHeader from "./BoardHeader";
import { AppContext } from "../App";
import BoardCatalogMenu from "./BoardCatalogMenu";
import LoadingIndicator from "../utils/LoadingIndicator";
import Footer from "../base/Footer";

const ThreadList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  padding: 20px;
  text-align: center;
  min-width: 100%;
  margin-top: 20px;

  @media screen and (max-width: 480px) {
    padding: 10px;
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  }
`;
function BoardCatalog() {
  const { label } = useParams();

  const { setActiveMenuPath } = useContext(AppContext);

  const [board, setBoard] = useState<BoardType>();
  const [threads, setThreads] = useState<ThreadCatalogType[]>([]);
  const [showOP, setShowOP] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const refreshCatalog = useUpdater();

  useEffect(() => {
    setLoading(true);
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
      })
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  }, [label, setActiveMenuPath, setBoard]);

  if (notFound) {
    return <Redirect to={NOT_FOUND_URL} />;
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    (board && (
      <BoardContext.Provider value={board}>
        <Helmet title={`/${board.label}/ - ${board.name} - Catalog`} />
        <BoardHeader catalog />
        <ThreadForm />
        <BoardCatalogMenu
          threads={threads}
          setThreads={setThreads}
          showOP={showOP}
          setShowOP={setShowOP}
          refreshCatalog={refreshCatalog}
        />
        <ThreadList>
          {threads.map((thread) => (
            <ThreadCatalog
              thread={thread}
              key={`${board?.label}-${thread.threadNumber}`}
              showOP={showOP}
            />
          ))}
        </ThreadList>
        <Footer />
      </BoardContext.Provider>
    )) ||
    null
  );
}

export default BoardCatalog;
