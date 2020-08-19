import { useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Item } from "semantic-ui-react";
import { AppContext } from "../App";
import { PostType } from "../../types";
import { SEARCH_URL } from "../../helpers/mappings";
import { apiErrorHandler, getApiRequest } from "../../helpers/api";
import Form, { TextInput } from "../form/Form";
import LoadingIndicator from "../utils/LoadingIndicator";
import Post from "./Post";

function PostSearch() {
  const { query: queryParam } = useParams();
  const { setActiveMenuPath } = useContext(AppContext);
  const [results, setResults] = useState<PostType[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => setActiveMenuPath(SEARCH_URL), [setActiveMenuPath]);
  useEffect(() => search(queryParam), [queryParam]);

  function search(query: string) {
    if (!query) {
      return;
    }

    setLoading(true);
    getApiRequest<PostType[]>(
      `${SEARCH_URL}?query=${encodeURIComponent(query)}`
    )
      .then(setResults)
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  }

  function onSearch({ query }: { query: string }) {
    search(query);
    window.history.replaceState(null, "", `${SEARCH_URL}/${query}`);
  }

  return (
    <>
      <Form onSubmit={onSearch} defaultValues={{ query: queryParam ?? "" }}>
        <TextInput name="query" placeholder="Search query" />
      </Form>

      {loading && <LoadingIndicator />}

      {results && (
        <Item.Group>
          {results.map((result) => (
            <Post
              key={`${result.thread?.board?.label}-${result.postNumber}`}
              post={result}
              isOP={false}
              embedded
            />
          ))}
        </Item.Group>
      )}
    </>
  );
}

export default PostSearch;
