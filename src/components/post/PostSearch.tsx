import { useHistory, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { Button, Header, Item } from "semantic-ui-react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet";
import { AppContext } from "../App";
import { PostSearchResultsType } from "../../types";
import { SEARCH_URL } from "../../helpers/mappings";
import { apiErrorHandler, getApiRequest } from "../../helpers/api";
import Form, { SearchBar } from "../form/Form";
import LoadingIndicator from "../utils/LoadingIndicator";
import Post from "./Post";
import SearchHelp from "../form/SearchHelp";

const SearchContainer = styled.div`
  width: 80%;
  margin: auto;
`;
const SearchHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;
const SearchStats = styled.div`
  font-style: oblique;
  padding-top: 10px;
`;
function PostSearch() {
  const { query: queryParam } = useParams();
  const { setActiveMenuPath } = useContext(AppContext);
  const [searchResults, setSearchResults] = useState<PostSearchResultsType>();
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => setActiveMenuPath(SEARCH_URL), [setActiveMenuPath]);
  useEffect(() => search(queryParam), [queryParam]);

  function search(query: string) {
    if (!query) {
      return;
    }

    setLoading(true);
    getApiRequest<PostSearchResultsType>(
      `${SEARCH_URL}?query=${encodeURIComponent(query)}`
    )
      .then(setSearchResults)
      .catch(apiErrorHandler)
      .finally(() => setLoading(false));
  }

  function onSearch({ query }: { query: string }) {
    search(query);
    history.replace(`${SEARCH_URL}/${query}`);
  }

  function getResultStats(results: PostSearchResultsType) {
    if (results.resultsCount === 0) {
      return "No posts were found matching this query.";
    }

    let stats = `Found ${results.totalResultsCount} posts matching this query.`;
    if (results.totalResultsCount > results.resultsCount) {
      stats += ` Showing top ${results.resultsCount} results.`;
    }

    return stats;
  }

  return (
    <SearchContainer>
      <Helmet title="Search posts" />
      <SearchHeader>
        <Header as="h1">Search posts</Header>
        <SearchHelp
          trigger={<Button icon="help" basic size="mini" content="Help" />}
        />
      </SearchHeader>
      <Form onSubmit={onSearch} defaultValues={{ query: queryParam ?? "" }}>
        <SearchBar
          name="query"
          placeholder="Search query"
          onSubmit={onSearch}
        />
      </Form>

      {loading && <LoadingIndicator />}

      {searchResults && (
        <>
          <SearchStats>{getResultStats(searchResults)}</SearchStats>
          <Item.Group>
            {searchResults.resultList.map((result) => (
              <Post
                key={`${result.thread?.board?.label}-${result.postNumber}`}
                post={result}
                embedded
              />
            ))}
          </Item.Group>
        </>
      )}
    </SearchContainer>
  );
}

export default PostSearch;
